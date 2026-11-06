// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from 'fs'
import path from 'path'

interface SwaggerAdditions {
  definitions?: Record<string, unknown>
  paths?: Record<string, unknown>
}

export function mergeSwaggerAdditions(
  swagger: Record<string, unknown>,
  additions: SwaggerAdditions,
): Record<string, unknown> {
  return {
    ...swagger,
    definitions: {
      ...(swagger.definitions as Record<string, unknown>),
      ...additions.definitions,
    },
    paths: {
      ...(swagger.paths as Record<string, unknown>),
      ...additions.paths,
    },
  }
}

export function getSwaggerAdditionTargets(
  outputPath: string,
  apiVersion: string,
  extensionVersion: string,
  fileName: string,
): string[] {
  const targets = [
    path.resolve(`output/microsoftgraph-${apiVersion}-${extensionVersion}.json`),
  ]

  if (outputPath !== 'output') {
    const releaseType = extensionVersion.endsWith('preview') ? 'preview' : 'official'
    targets.push(path.resolve(outputPath, releaseType, apiVersion, fileName))
  }

  return targets
}

export function applyVersionedSwaggerAdditions(outputPath: string): void {
  const additionsRoot = path.resolve('additions')
  if (!fs.existsSync(additionsRoot)) {
    return
  }

  for (const apiVersion of fs.readdirSync(additionsRoot)) {
    const apiVersionPath = path.join(additionsRoot, apiVersion)
    if (!fs.statSync(apiVersionPath).isDirectory()) {
      continue
    }

    for (const fileName of fs.readdirSync(apiVersionPath)) {
      if (path.extname(fileName) !== '.json') {
        continue
      }
      const extensionVersion = path.basename(fileName, '.json')
      const additions = JSON.parse(
        fs.readFileSync(path.join(apiVersionPath, fileName), 'utf8'),
      ) as SwaggerAdditions

      const targets = getSwaggerAdditionTargets(
        outputPath,
        apiVersion,
        extensionVersion,
        fileName,
      )

      for (const [targetIndex, target] of targets.entries()) {
        if (!fs.existsSync(target)) {
          if (targetIndex === 0) {
            throw new Error(`Swagger additions target does not exist: ${target}`)
          }

          fs.mkdirSync(path.dirname(target), { recursive: true })
          fs.copyFileSync(targets[0], target)
          console.log(`Seeded ${apiVersion}/${extensionVersion} Swagger at ${target}`)
          continue
        }

        const swagger = JSON.parse(fs.readFileSync(target, 'utf8')) as Record<string, unknown>
        const merged = mergeSwaggerAdditions(swagger, additions)
        fs.writeFileSync(target, `${JSON.stringify(merged, null, 2)}\n`)
        console.log(`Applied ${apiVersion}/${extensionVersion} Swagger additions to ${target}`)
      }
    }
  }
}
