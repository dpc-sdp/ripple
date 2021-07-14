import menuHierarchy from '../../lib/core/menu-hierarchy'

describe('menuHierarchy', () => {
  test('should get menus from Drupal', async () => {
    const menus = {
      menuMain: [
        {
          id: 'b40ede4e-c2a3-45cc-8c62-850c35b6ef9d',
          attributes: {
            uuid: 'b40ede4e-c2a3-45cc-8c62-850c35b6ef9d',
            title: 'Blandit esca humo os refero.',
            link: {
              uri: 'entity:node/landing_page/b76030b8-24d3-43ed-a047-3d6e3db5e1c0',
              url: '/blandit-esca-humo-os-refero'
            },
            weight: -48,
            enabled: true,
            parent: null
          }
        },
        {
          id: '891b7da5-1545-4bca-aeb0-33644c87ca3a',
          attributes: {
            uuid: '891b7da5-1545-4bca-aeb0-33644c87ca3a',
            title: 'Augue facilisis gravis laoreet loquor quadrum sagaciter',
            link: {
              uri: 'entity:node/landing_page/bed34114-613c-42bb-bf86-75364eac3619',
              url: '/augue-facilisis-gravis-laoreet-loquor-quadrum-sagaciter'
            },
            weight: -50,
            enabled: true,
            parent: 'menu_link_content:532ffc05-6bf1-4933-a0cf-aad4a420a157'
          }
        },
        {
          id: 'e4126a85-551d-4300-a86c-cf671593d698',
          attributes: {
            uuid: 'e4126a85-551d-4300-a86c-cf671593d698',
            title: 'Ad adipiscing consectetuer gilvus gravis iaceo illum mauris',
            link: {
              uri: 'entity:node/landing_page/514b2713-26bc-4957-a395-ff6534e02bbf',
              url: '/ad-adipiscing-consectetuer-gilvus-gravis-iaceo-illum-mauris'
            },
            weight: -50,
            enabled: true,
            parent: null
          }
        },
        {
          id: '9a0acc49-1aef-4a05-a082-dc7fd1ac7d65',
          attributes: {
            uuid: '9a0acc49-1aef-4a05-a082-dc7fd1ac7d65',
            title: 'Lucidus melior valetudo. Et importunus refoveo',
            link: {
              uri: 'entity:node/landing_page/391fa293-2098-48ce-8f6c-342e723e6ffa',
              url: '/lucidus-melior-valetudo-et-importunus-refoveo'
            },
            weight: -50,
            enabled: true,
            parent: 'menu_link_content:b40ede4e-c2a3-45cc-8c62-850c35b6ef9d'
          }
        },
        {
          id: '9df54901-7444-4933-a0b0-3f240461b654',
          attributes: {
            uuid: '9df54901-7444-4933-a0b0-3f240461b654',
            title: 'Modo nibh nostrud praemitto quia similis.',
            link: {
              uri: 'entity:node/landing_page/7caf8417-e9e7-4b1d-b27f-1458e65e5e8b',
              url: '/modo-nibh-nostrud-praemitto-quia-similis'
            },
            weight: -49,
            enabled: true,
            parent: 'menu_link_content:b40ede4e-c2a3-45cc-8c62-850c35b6ef9d'
          }
        },
        {
          id: '532ffc05-6bf1-4933-a0cf-aad4a420a157',
          attributes: {
            uuid: '532ffc05-6bf1-4933-a0cf-aad4a420a157',
            title: 'Adipiscing at capto eligo nunc quis utrum.',
            link: {
              uri: 'entity:node/landing_page/ddb47190-115a-4496-a9d4-0d99fe4f0080',
              url: '/adipiscing-capto-eligo-nunc-quis-utrum'
            },
            weight: -49,
            enabled: true,
            parent: null
          }
        },
        {
          id: '0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0',
          attributes: {
            uuid: '0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0',
            title: 'Policies & frameworks',
            link: {
              uri: 'entity:node/landing_page/6a042b51-43cc-4488-96a9-33e7b16e4011',
              url: '/policies-and-frameworks'
            },
            weight: 6,
            enabled: true,
            parent: null
          }
        },
        {
          id: '318388d8-a5e3-4977-a568-2e8afab26557',
          attributes: {
            uuid: '318388d8-a5e3-4977-a568-2e8afab26557',
            title: 'Social Procurement Framework',
            link: {
              uri: 'entity:node/landing_page/49f3cb3c-222f-40a5-bb5d-fd6f523d81b8',
              url: '/social-procurement-framework'
            },
            weight: 11,
            enabled: true,
            parent: 'menu_link_content:0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0'
          }
        },
        {
          id: '27156865-d6e0-4ed8-a1f2-38df0c7d4eea',
          attributes: {
            uuid: '27156865-d6e0-4ed8-a1f2-38df0c7d4eea',
            title: 'Supplier Code of Conduct',
            link: {
              uri: 'entity:node/landing_page/f4066b1c-a589-4ad5-a0bd-e4bce3ca135f',
              url: '/supplier-code-conduct'
            },
            weight: 13,
            enabled: true,
            parent: 'menu_link_content:0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0'
          }
        },
        {
          id: 'da7700a7-3b7d-497f-b6a1-5929d2e4d034',
          attributes: {
            uuid: 'da7700a7-3b7d-497f-b6a1-5929d2e4d034',
            title: 'Goods and services procurement policies and frameworks',
            link: {
              uri: 'entity:node/landing_page/d86d9963-38a6-45a6-b4ec-e7e656465339',
              url: '/goods-and-services-procurement-policies-and-frameworks'
            },
            weight: 10,
            enabled: true,
            parent: 'menu_link_content:0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0'
          }
        },
        {
          id: '7fe13355-5207-4eb3-a4ee-7d47adec6c8c',
          attributes: {
            uuid: '7fe13355-5207-4eb3-a4ee-7d47adec6c8c',
            title: 'Health purchasing',
            link: {
              uri: 'entity:node/landing_page/3a626db7-0e0e-469e-90b7-ba304bf0543c',
              url: '/health-purchasing'
            },
            weight: 15,
            enabled: false,
            parent: 'menu_link_content:0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0'
          }
        },
        {
          id: 'd0a08aef-83d1-4777-8209-661aec7707f0',
          attributes: {
            uuid: 'd0a08aef-83d1-4777-8209-661aec7707f0',
            title: 'Other procurement policies and frameworks',
            link: {
              uri: 'entity:node/landing_page/7ba077b4-a496-4e63-aba6-9dc02607c726',
              url: '/other-procurement-policies-and-frameworks'
            },
            weight: 14,
            enabled: true,
            parent: 'menu_link_content:0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0'
          }
        },
        {
          id: '109cceb2-7073-443f-9d7d-7380f1ac1556',
          attributes: {
            uuid: '109cceb2-7073-443f-9d7d-7380f1ac1556',
            title: 'Construction procurement policies and frameworks',
            link: {
              uri: 'entity:node/landing_page/0649759b-00d1-4498-93f0-b2fca66cbefc',
              url: '/construction-procurement-policies-and-frameworks'
            },
            weight: 9,
            enabled: true,
            parent: 'menu_link_content:0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0'
          }
        },
        {
          id: 'f034b1c0-6dbd-45a4-9628-b8b3ad237132',
          attributes: {
            uuid: 'f034b1c0-6dbd-45a4-9628-b8b3ad237132',
            title: 'Construction Procurement Laws',
            link: {
              uri: 'entity:node/landing_page/28f14b39-a224-4e19-9349-e912b36bdb80',
              url: '/construction-procurement-laws'
            },
            weight: 10,
            enabled: true,
            parent: 'menu_link_content:109cceb2-7073-443f-9d7d-7380f1ac1556'
          }
        }
      ],
      menuFooter: [
        {
          id: 'd65c05a4-f68a-4cc7-9733-3661dce1db12',
          attributes: {
            uuid: 'd65c05a4-f68a-4cc7-9733-3661dce1db12',
            title: 'Blandit esca humo os refero.',
            link: {
              uri: 'entity:node/landing_page/b76030b8-24d3-43ed-a047-3d6e3db5e1c0',
              url: '/blandit-esca-humo-os-refero'
            },
            weight: -50,
            enabled: true,
            parent: 'menu_link_content:95149131-2036-42ff-8e0d-797c6f9e8eb6'
          }
        },
        {
          id: '95149131-2036-42ff-8e0d-797c6f9e8eb6',
          attributes: {
            uuid: '95149131-2036-42ff-8e0d-797c6f9e8eb6',
            title: 'Augue facilisis gravis laoreet loquor quadrum sagaciter',
            link: {
              uri: 'entity:node/landing_page/bed34114-613c-42bb-bf86-75364eac3619',
              url: '/augue-facilisis-gravis-laoreet-loquor-quadrum-sagaciter'
            },
            weight: -48,
            enabled: true,
            parent: null
          }
        },
        {
          id: 'e8ab3b2c-9632-4bde-b334-20f5fec07b6e',
          attributes: {
            uuid: 'e8ab3b2c-9632-4bde-b334-20f5fec07b6e',
            title: 'Ad adipiscing consectetuer gilvus gravis iaceo illum mauris',
            link: {
              uri: 'entity:node/landing_page/514b2713-26bc-4957-a395-ff6534e02bbf',
              url: '/ad-adipiscing-consectetuer-gilvus-gravis-iaceo-illum-mauris'
            },
            weight: -49,
            enabled: true,
            parent: null
          }
        },
        {
          id: '9eee792c-3c20-41c9-af5f-b9f49232e755',
          attributes: {
            uuid: '9eee792c-3c20-41c9-af5f-b9f49232e755',
            title: 'Lucidus melior valetudo. Et importunus refoveo',
            link: {
              uri: 'entity:node/landing_page/391fa293-2098-48ce-8f6c-342e723e6ffa',
              url: '/lucidus-melior-valetudo-et-importunus-refoveo'
            },
            weight: -49,
            enabled: true,
            parent: 'menu_link_content:95149131-2036-42ff-8e0d-797c6f9e8eb6'
          }
        },
        {
          id: 'd6a7f3f7-13c7-4658-8122-32a28d94d65a',
          attributes: {
            uuid: 'd6a7f3f7-13c7-4658-8122-32a28d94d65a',
            title: 'Modo nibh nostrud praemitto quia similis.',
            link: {
              uri: 'entity:node/landing_page/7caf8417-e9e7-4b1d-b27f-1458e65e5e8b',
              url: '/modo-nibh-nostrud-praemitto-quia-similis'
            },
            weight: -50,
            enabled: true,
            parent: null
          }
        },
        {
          id: 'e8620fcf-5736-4973-9ca4-7bd0699167a2',
          attributes: {
            uuid: 'e8620fcf-5736-4973-9ca4-7bd0699167a2',
            title: 'Adipiscing at capto eligo nunc quis utrum.',
            link: {
              uri: 'entity:node/landing_page/ddb47190-115a-4496-a9d4-0d99fe4f0080',
              url: '/adipiscing-capto-eligo-nunc-quis-utrum'
            },
            weight: -50,
            enabled: true,
            parent: 'menu_link_content:e8ab3b2c-9632-4bde-b334-20f5fec07b6e'
          }
        }
      ]
    }

    const components = {
      menuMain: [
        {
          text: 'Ad adipiscing consectetuer gilvus gravis iaceo illum mauris',
          url: '/ad-adipiscing-consectetuer-gilvus-gravis-iaceo-illum-mauris',
          uuid: 'e4126a85-551d-4300-a86c-cf671593d698',
          parent: null,
          weight: -50
        },
        {
          text: 'Adipiscing at capto eligo nunc quis utrum.',
          url: '/adipiscing-capto-eligo-nunc-quis-utrum',
          uuid: '532ffc05-6bf1-4933-a0cf-aad4a420a157',
          parent: null,
          weight: -49,
          children: [
            {
              text: 'Augue facilisis gravis laoreet loquor quadrum sagaciter',
              url: '/augue-facilisis-gravis-laoreet-loquor-quadrum-sagaciter',
              uuid: '891b7da5-1545-4bca-aeb0-33644c87ca3a',
              parent: '532ffc05-6bf1-4933-a0cf-aad4a420a157',
              weight: -50
            }
          ]
        },
        {
          text: 'Blandit esca humo os refero.',
          url: '/blandit-esca-humo-os-refero',
          uuid: 'b40ede4e-c2a3-45cc-8c62-850c35b6ef9d',
          parent: null,
          weight: -48,
          children: [
            {
              text: 'Lucidus melior valetudo. Et importunus refoveo',
              url: '/lucidus-melior-valetudo-et-importunus-refoveo',
              uuid: '9a0acc49-1aef-4a05-a082-dc7fd1ac7d65',
              parent: 'b40ede4e-c2a3-45cc-8c62-850c35b6ef9d',
              weight: -50
            },
            {
              text: 'Modo nibh nostrud praemitto quia similis.',
              url: '/modo-nibh-nostrud-praemitto-quia-similis',
              uuid: '9df54901-7444-4933-a0b0-3f240461b654',
              parent: 'b40ede4e-c2a3-45cc-8c62-850c35b6ef9d',
              weight: -49
            }
          ]
        },
        {
          text: 'Policies & frameworks',
          url: '/policies-and-frameworks',
          uuid: '0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0',
          parent: null,
          weight: 6,
          children: [
            {
              text: 'Construction procurement policies and frameworks',
              url: '/construction-procurement-policies-and-frameworks',
              uuid: '109cceb2-7073-443f-9d7d-7380f1ac1556',
              parent: '0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0',
              weight: 9,
              children: [
                {
                  text: 'Construction Procurement Laws',
                  url: '/construction-procurement-laws',
                  uuid: 'f034b1c0-6dbd-45a4-9628-b8b3ad237132',
                  parent: '109cceb2-7073-443f-9d7d-7380f1ac1556',
                  weight: 10
                }
              ]
            },
            {
              text: 'Goods and services procurement policies and frameworks',
              url: '/goods-and-services-procurement-policies-and-frameworks',
              uuid: 'da7700a7-3b7d-497f-b6a1-5929d2e4d034',
              parent: '0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0',
              weight: 10
            },
            {
              text: 'Social Procurement Framework',
              url: '/social-procurement-framework',
              uuid: '318388d8-a5e3-4977-a568-2e8afab26557',
              parent: '0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0',
              weight: 11
            },
            {
              text: 'Supplier Code of Conduct',
              url: '/supplier-code-conduct',
              uuid: '27156865-d6e0-4ed8-a1f2-38df0c7d4eea',
              parent: '0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0',
              weight: 13
            },
            {
              text: 'Other procurement policies and frameworks',
              url: '/other-procurement-policies-and-frameworks',
              uuid: 'd0a08aef-83d1-4777-8209-661aec7707f0',
              parent: '0628c5d7-4fa0-467d-91f1-70cdfbcf9bb0',
              weight: 14
            }
          ]
        }
      ],
      menuFooter: [
        {
          text: 'Modo nibh nostrud praemitto quia similis.',
          url: '/modo-nibh-nostrud-praemitto-quia-similis',
          uuid: 'd6a7f3f7-13c7-4658-8122-32a28d94d65a',
          parent: null,
          weight: -50
        },
        {
          text: 'Ad adipiscing consectetuer gilvus gravis iaceo illum mauris',
          url: '/ad-adipiscing-consectetuer-gilvus-gravis-iaceo-illum-mauris',
          uuid: 'e8ab3b2c-9632-4bde-b334-20f5fec07b6e',
          parent: null,
          weight: -49,
          children: [
            {
              text: 'Adipiscing at capto eligo nunc quis utrum.',
              url: '/adipiscing-capto-eligo-nunc-quis-utrum',
              uuid: 'e8620fcf-5736-4973-9ca4-7bd0699167a2',
              parent: 'e8ab3b2c-9632-4bde-b334-20f5fec07b6e',
              weight: -50
            }
          ]
        },
        {
          text: 'Augue facilisis gravis laoreet loquor quadrum sagaciter',
          url: '/augue-facilisis-gravis-laoreet-loquor-quadrum-sagaciter',
          uuid: '95149131-2036-42ff-8e0d-797c6f9e8eb6',
          parent: null,
          weight: -48,
          children: [
            {
              text: 'Blandit esca humo os refero.',
              url: '/blandit-esca-humo-os-refero',
              uuid: 'd65c05a4-f68a-4cc7-9733-3661dce1db12',
              parent: '95149131-2036-42ff-8e0d-797c6f9e8eb6',
              weight: -50
            },
            {
              text: 'Lucidus melior valetudo. Et importunus refoveo',
              url: '/lucidus-melior-valetudo-et-importunus-refoveo',
              uuid: '9eee792c-3c20-41c9-af5f-b9f49232e755',
              parent: '95149131-2036-42ff-8e0d-797c6f9e8eb6',
              weight: -49
            }
          ]
        }
      ]
    }

    const result = menuHierarchy.getHierarchicalMenu(menus)

    expect(result).toEqual(components)
  })
})
