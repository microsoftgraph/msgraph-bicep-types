// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  applyVersionedSwaggerAdditions,
  getSwaggerAdditionTargets,
  mergeSwaggerAdditions,
} from '../src/swaggerAdditions'

describe('mergeSwaggerAdditions', () => {
  it('adds and replaces only definitions and paths', () => {
    const swagger = {
      swagger: '2.0',
      definitions: {
        existing: { type: 'string' },
        replaced: { type: 'string' },
      },
      paths: {
        '/existing': { get: {} },
      },
    }
    const additions = {
      definitions: {
        replaced: { type: 'boolean' },
        added: { type: 'object' },
      },
      paths: {
        '/added': { get: {} },
      },
    }

    expect(mergeSwaggerAdditions(swagger, additions)).toEqual({
      swagger: '2.0',
      definitions: {
        existing: { type: 'string' },
        replaced: { type: 'boolean' },
        added: { type: 'object' },
      },
      paths: {
        '/existing': { get: {} },
        '/added': { get: {} },
      },
    })
  })

  describe('getSwaggerAdditionTargets', () => {
    it('uses only the local output for the default output path', () => {
      expect(getSwaggerAdditionTargets('output', 'beta', '1.0.0', '1.0.0.json')).toEqual([
        path.resolve('output/microsoftgraph-beta-1.0.0.json'),
      ])
    })

    it('includes the specification output for an explicit output path', () => {
      expect(getSwaggerAdditionTargets('swagger', 'beta', '1.0.0', '1.0.0.json')).toEqual([
        path.resolve('output/microsoftgraph-beta-1.0.0.json'),
        path.resolve('swagger/official/beta/1.0.0.json'),
      ])
    })

    it('seeds a missing explicit output from the local Swagger snapshot', () => {
      const originalDirectory = process.cwd()
      const testDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'swagger-additions-'))

      try {
        process.chdir(testDirectory)
        fs.mkdirSync('additions/beta', { recursive: true })
        fs.mkdirSync('output', { recursive: true })
        fs.writeFileSync(
          'additions/beta/1.0.0.json',
          JSON.stringify({ definitions: { added: { type: 'string' } } }),
        )
        fs.writeFileSync(
          'output/microsoftgraph-beta-1.0.0.json',
          JSON.stringify({ swagger: '2.0', definitions: {}, paths: {} }),
        )

        const explicitOutput = path.join(testDirectory, 'swagger')
        applyVersionedSwaggerAdditions(explicitOutput)

        const seeded = JSON.parse(
          fs.readFileSync(
            path.join(explicitOutput, 'official/beta/1.0.0.json'),
            'utf8',
          ),
        ) as Record<string, unknown>
        expect(seeded.definitions).toEqual({ added: { type: 'string' } })
      } finally {
        process.chdir(originalDirectory)
        fs.rmSync(testDirectory, { recursive: true, force: true })
      }
    })
  })
})
