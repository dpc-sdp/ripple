import fs from 'fs'
import { resolve } from 'pathe'
import { promisify } from 'util'
import { optimize } from 'svgo'

const asyncReadFile = promisify(fs.readFile)

export const svgoConfigDefault = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {}
      }
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill|stroke)'
      }
    },
    {
      name: 'removeAttributesBySelector',
      params: {
        selector: '[style*=fill:#]',
        attributes: 'style'
      }
    },
    {
      name: 'removeStyleElement',
      active: true
    }
  ]
}

export const optimizeSvgDef = (
  data: string,
  id: string,
  options?: RplSvgSpriteOptions['spriteOptions']
): string | null => {
  if (!data) {
    return null
  }
  const svgoConfig = options?.svgoConfig || svgoConfigDefault
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const optimizedSvg = optimize(data, svgoConfig).data
  return optimizedSvg
    .replace('<svg', `<symbol fill="currentColor" id="${id}"`)
    .replace('</svg>', '</symbol>')
    .replace(/<defs>(.+)<\/defs>/, '')
}

export const gatherSvgList = (folderPath): string[] => {
  return fs
    .readdirSync(folderPath)
    .filter((fn) => fn.endsWith('.svg'))
    .map((file) => {
      return file.replace('.svg', '')
    })
}

export const generateSprite = async (
  folderPath: string,
  iconNames: string[],
  options: RplSvgSpriteOptions['spriteOptions'] = {
    id: 'rpl-icon-sprite',
    ariaHidden: true
  }
) => {
  const resolvedPath = resolve(folderPath)
  if (!resolvedPath) {
    return ''
  }
  const icons: string[] = []

  for (let i = 0; i < iconNames.length; i++) {
    try {
      const svgData = await asyncReadFile(
        folderPath + '/' + iconNames[i] + '.svg'
      ).then((d) => d.toString())
      const def = optimizeSvgDef(svgData, iconNames[i], options)
      if (def) {
        icons.push(def)
      }
    } catch (error) {
      console.log('Error loading icons', error)
    }
  }

  let svg = `<svg id="${options.id}" ${
    options.ariaHidden && 'aria-hidden="true"'
  }>`
  icons.map((icon) => {
    svg = svg + `<defs>${icon}</defs>`
  })
  return svg + `</svg>`
}

export type RplSvgSpriteOptions = {
  spriteFileName?: string
  spriteListPath?: string
  iconNames?: string[]
  generateList?: boolean
  spriteOptions?: {
    id?: string
    svgoConfig?: any
    ariaHidden: boolean
  }
}

export const saveSprite = async (
  inputPath: string,
  outputPath: string,
  options?: RplSvgSpriteOptions
) => {
  const iconNames = options?.iconNames || gatherSvgList(inputPath)
  const sprite = await generateSprite(inputPath, iconNames)
  const spriteFileName = options?.spriteFileName || 'sprite'
  const spriteListPath = options?.spriteListPath || outputPath + '/sprite.js'
  const generateList =
    typeof options?.generateList !== 'undefined' ? options.generateList : true
  if (sprite !== '') {
    fs.writeFileSync(outputPath + `/${spriteFileName}.svg`, sprite)
  }
  if (generateList && iconNames) {
    fs.writeFileSync(
      spriteListPath,
      `export default ${JSON.stringify(iconNames)}`
    )
  }
}

export const optimizeSvgFolder = async (
  inputPath: string,
  outputPath: string
) => {
  const iconNames = gatherSvgList(inputPath)
  for (let i = 0; i < iconNames.length; i++) {
    try {
      const svgData = await asyncReadFile(
        inputPath + '/' + iconNames[i] + '.svg'
      ).then((d) => d.toString())
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const optimizedSvg = optimize(svgData, svgoConfig).data

      if (optimizedSvg) {
        fs.writeFileSync(`${outputPath}/${iconNames[i]}.svg`, optimizedSvg)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const generateIconImports = async (
  inputPath: string,
  outputPath: string,
  options?: {
    importbasePath?: string
  }
) => {
  const iconNames = gatherSvgList(inputPath)
  const basePath = options?.importbasePath || 'custom'
  const imports = {}
  if (iconNames) {
    iconNames.forEach((key) => {
      imports[key] = `#() => import('./${basePath}/${key}.svg?component')#`
    })
    const template = JSON.stringify(imports, null, 2)
      .replaceAll('"#', '')
      .replaceAll('#"', '')
    fs.writeFileSync(outputPath, `export default ${template}`)
  }
}

export default saveSprite
