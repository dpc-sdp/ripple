const puppeteer = require('puppeteer'); //eslint-disable-line
const utils = require('./util')

/**
 * Library for controlling Tide Drupal backend via puppeteer
 *
 * @class TideAdmin
 */
module.exports = class TideAdmin {
  constructor () {
    this.browser = null
    this.page = null
    this.backendURL = process.env.CONTENT_API_SERVER

    this.httpAuth = {
      username: process.env.CONTENT_API_AUTH_USER,
      password: process.env.CONTENT_API_AUTH_PASS
    }

    this.adminCredentials = {
      username: process.env.CYPRESS_ADMIN_USERNAME,
      password: process.env.CYPRESS_ADMIN_PASSWORD
    }

    this.options = {
      wait: { waitUntil: 'networkidle2', timeout: 0 },
      start: {
        headless: !process.env.CYPRESS_SHOW_PUPPETEER,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    }
    this.pageModels = require('./page-models').adminPageModels
  }

  async setup () {
    this.browser = await puppeteer.launch(this.options.start)
    this.page = await this.browser.newPage()
    await this.page.authenticate(this.httpAuth)
    await this.page.setViewport({ width: 1280, height: 1064 })
    return this.page
  }

  async login () {
    try {
      await this.page.goto(this.backendURL)
      await this.page.waitForSelector(this.pageModels.login.name, this.options.wait)
      await this.page.type(
        this.pageModels.login.name,
        this.adminCredentials.username
      )
      await this.page.type(
        this.pageModels.login.pass,
        this.adminCredentials.password
      )
      return Promise.all([
        this.page.$eval(this.pageModels.login.form, form => form.submit()),
        this.page.waitForNavigation(this.options.wait),
        this.page.waitForSelector('#drupal-live-announce', this.options.wait)
      ])
    } catch (error) {
      console.error(error)
      await this.close()
    }
  }
  async setSelectVal (sel, val) {
    this.page.evaluate(
      data => {
        return (document.querySelector(data.sel).value = data.val)
      },
      { sel, val }
    )
  }
  /**
   * Creates a node from a YAML upload
   * @param {*} testData
   * @returns string (true or false)
   */
  async createNodeFromYAML (testData) {
    if (!testData) return null
    try {
      // create browser and page
      const page = await this.setup()

      // Login
      await this.login()
      await page.goto(`${this.backendURL}/admin/content/import_demo_content`)
      await this.setSelectVal('#edit-import', testData)
      // Submit
      await this.submitPage()
      await page.waitForSelector('[aria-label="Status message"]', this.options.wait)
      const result = await page.$eval('[aria-label="Status message"]', el =>
        el
          .classList.contains('messages--status')
      )
      await this.close()
      return result
    } catch (error) {
      // Cleanup
      await this.close()
    }
  }

  /**
   * Creates a landing page given testdata in json format
   * @param {*} testData
   * @returns nodeId
   */
  async createLandingPage (testData) {
    if (!testData) return null
    // create browser and page
    const page = await this.setup()

    // Login
    await this.login()
    // aliases
    const lPage = this.pageModels['landingPage']

    // Create Landing page
    await page.goto(`${this.backendURL}/node/add/landing_page`)
    await page.waitForSelector('#drupal-live-announce', this.options.wait)
    await page.type(this.pageModels.common.title, testData.title)
    await page.type(this.pageModels.common.summary, testData.summary)
    await page.type(this.pageModels.common.topic, testData.topic)
    await page.click(this.pageModels.common.siteCheckbox(testData.siteNumber))
    await page.click(this.pageModels.common.primarySite(testData.siteNumber))

    // protected content
    if (testData.authenticatedContentGroup) {
      const acGroup = await page.$$eval(
        lPage.authenticatedContent + ' option',
        (nodes, data) => {
          const item = Array.from(nodes).find(node => node.text === data)
          if (item) {
            return item.value
          }
        },
        testData.authenticatedContentGroup
      )
      await page.select(lPage.authenticatedContent, acGroup)
    }

    // Components
    await page.click(
      '.horizontal-tabs .horizontal-tab-button-3 a',
      this.options.wait
    )
    await page.waitForSelector('#edit-group-components', this.options.wait)

    const setLandingPageComponentType = async (type, index) => {
      await page.select(lPage.componentSelect, type)
      await page.click(lPage.componentAddButton)
      await page.waitForSelector(
        utils.dataSel(`edit-field-landing-page-component-${index}`),
        this.options.wait
      )
      await page.waitFor(3000)
      return Promise.resolve()
    }

    // Create an async func for each component
    // webform
    const setWebForm = async (component, index) => {
      await setLandingPageComponentType('embedded_webform', index)
      await page.type(
        lPage.components.webform.title(index),
        component.formTitle
      )
      await page.select(
        lPage.components.webform.type(index),
        component.formType
      )
      return Promise.resolve()
    }

    // User Authentication Block
    const setUserAuthBlock = async (component, index) => {
      await setLandingPageComponentType('user_authentication_block', index)
      await page.type(
        lPage.components.userAuthBlock.nextPage(index),
        component.nextPage
      )
      return Promise.resolve()
    }

    // Card Event Automated
    const setCardEventAutomated = async (component, index) => {
      await setLandingPageComponentType('card_event_auto', index)
      await page.type(lPage.components.cardEventAuto.cta(index), component.cta)
      await page.type(
        lPage.components.cardEventAuto.event(index),
        component.event
      )
      return Promise.resolve()
    }

    // wysiwyg
    const setBasicText = async (component, index) => {
      await setLandingPageComponentType('basic_text', index)
      await page.waitFor(3000)
      await utils.setWysiwygText(
        utils.dataSel(`edit-field-landing-page-component-${index}`),
        component.content,
        page
      )
      return Promise.resolve()
    }

    // Accordion
    const setAccordion = async (component, index) => {
      await setLandingPageComponentType('accordion', index)
      await page.type(lPage.components.accordion.title(index), component.title)
      await page.select(
        lPage.components.accordion.style(index),
        component.style
      )
      async function addAccordionItems (items) {
        for (let accIdx = 0; accIdx < items.length; accIdx++) {
          const item = items[accIdx]
          if (accIdx === 0) {
            // first item is already open
            await page.type(
              lPage.components.accordion.item.name(index, accIdx),
              item.name
            )
            await utils.setWysiwygText(
              lPage.components.accordion.item.content(index, accIdx),
              item.content,
              page
            )
          } else {
            await page.click(lPage.components.accordion.item.addItemBtn(index))
            await page.waitFor(3000)
            await page.type(
              lPage.components.accordion.item.name(index, accIdx),
              item.name
            )
            await utils.setWysiwygText(
              lPage.components.accordion.item.content(index, accIdx),
              item.content,
              page
            )
          }
        }
      }

      await addAccordionItems(component.accordionItems)
      return Promise.resolve()
    }

    const addComponent = async (component, index) => {
      switch (component.type) {
        case 'Embedded Webform':
          await setWebForm(component, index)
          break
        case 'Basic Text':
          await setBasicText(component, index)
          break
        case 'Accordion':
          await setAccordion(component, index)
          break
        case 'User Authentication Block':
          await setUserAuthBlock(component, index)
          break
        case 'Card Event Automated':
          await setCardEventAutomated(component, index)
          break
      }
    }

    async function addComponents () {
      for (let i = 0; i < testData.components.length; i++) {
        await addComponent(testData.components[i], i)
      }
    }

    await addComponents()

    // Set moderation state. Default to published.
    await page.select(
      this.pageModels.common.moderationState,
      testData.moderationState || 'published'
    )

    // Submit
    await this.submitPage()
    // get nodeid
    await page.waitForSelector('#drupal-live-announce', this.options.wait)
    const nodeId = await page.$eval('.tabs__tab .is-active', el =>
      el
        .getAttribute('data-drupal-link-system-path')
        .split('/')
        .pop()
    )

    const previewLink =
      testData.moderationState === 'draft'
        ? await page.$eval('.node-revision-preview-links a', el => {
          const url = el.getAttribute('href')
          return url.substr(url.indexOf('/preview/'))
        })
        : null

    // Cleanup
    await this.close()

    // Return node information.
    if (previewLink) {
      return Promise.resolve({ nodeId, previewLink })
    } else {
      return Promise.resolve(nodeId)
    }
  }

  async createGrantPage (testData) {
    // create browser and page
    const page = await this.setup()
    const gPage = this.pageModels['grantPage']

    // Login
    await this.login()

    // Create Grant page
    await page.goto(`${this.backendURL}/node/add/grant`)
    await page.waitForSelector('#drupal-live-announce', this.options.wait)
    await page.type(this.pageModels.common.title, testData.title)
    await page.type(this.pageModels.common.summary, testData.summary)
    await page.type(this.pageModels.common.topic, testData.topic)
    await page.click(this.pageModels.common.primarySite(testData.siteNumber))
    await page.click(this.pageModels.common.siteCheckbox(testData.siteNumber))

    // details tab
    // Overview
    await page.click(gPage.tabs.grantDetails)
    await page.type(
      gPage.grantDetails.overview.title,
      testData.grantDetailsOverviewTitle
    )
    await utils.setWysiwygText(
      gPage.grantDetails.overview.description,
      testData.grantDetailsOverviewDescription,
      page
    )
    await page.type(
      gPage.grantDetails.overview.funding.from,
      testData.grantDetailsOverviewFundingFrom
    )
    await page.type(
      gPage.grantDetails.overview.funding.to,
      testData.grantDetailsOverviewFundingTo
    )
    if (testData.grantDetailsOverviewAudience1) {
      await page.type(
        gPage.grantDetails.overview.audience1,
        testData.grantDetailsOverviewAudience1
      )
    }
    if (testData.grantDetailsOverviewAudience2) {
      await page.click(gPage.grantDetails.overview.audienceAddMore)
      await page.waitFor(2000)
      await page.type(
        gPage.grantDetails.overview.audience2,
        testData.grantDetailsOverviewAudience2
      )
    }

    if (testData.grantDetailsOverviewOngoing === 'true') {
      await page.click(gPage.grantDetails.overview.ongoingCheckbox)
    } else {
      await page.type(
        gPage.grantDetails.overview.date.startdate,
        testData.grantDetailsOverviewStartDate
      )
      await page.type(
        gPage.grantDetails.overview.date.starttime,
        testData.grantDetailsOverviewStartTime
      )
      await page.type(
        gPage.grantDetails.overview.date.enddate,
        testData.grantDetailsOverviewEndDate
      )
      await page.type(
        gPage.grantDetails.overview.date.endtime,
        testData.grantDetailsOverviewEndTime
      )
    }

    await page.type(
      gPage.grantDetails.overview.cta.uri,
      testData.grantDetailsOverviewCtaUri
    )
    await page.type(
      gPage.grantDetails.overview.cta.title,
      testData.grantDetailsOverviewCtaTitle
    )

    // Timeline
    await page.click(gPage.grantDetails.tabs.timeline)
    await page.type(
      gPage.grantDetails.timeline.title,
      testData.grantTimelineTitle
    )
    await page.type(
      gPage.grantDetails.timeline.item.title,
      testData.grantTimelineItem1Title
    )
    await page.type(
      gPage.grantDetails.timeline.item.summary,
      testData.grantTimelineItem1Summary
    )
    await page.type(
      gPage.grantDetails.timeline.item.startdate,
      testData.grantTimelineItem1Startdate
    )
    await page.type(
      gPage.grantDetails.timeline.item.starttime,
      testData.grantTimelineItem1Starttime
    )
    await page.type(
      gPage.grantDetails.timeline.item.enddate,
      testData.grantTimelineItem1Enddate
    )
    await page.type(
      gPage.grantDetails.timeline.item.endtime,
      testData.grantTimelineItem1Endtime
    )

    // Guidelines
    await page.click(gPage.grantDetails.tabs.guidelines)
    await page.click(gPage.grantDetails.guidelines.eligibility.title, {
      clickCount: 3
    })
    await page.type(
      gPage.grantDetails.guidelines.eligibility.title,
      testData.grantGuidelinesEligibilityTitle
    )
    await utils.setWysiwygText(
      gPage.grantDetails.guidelines.eligibility.text,
      testData.grantGuidelinesEligibilityText,
      page
    )
    await page.click(gPage.grantDetails.guidelines.criteria.title, {
      clickCount: 3
    })
    await page.type(
      gPage.grantDetails.guidelines.criteria.title,
      testData.grantGuidelinesCriteriaTitle
    )
    await utils.setWysiwygText(
      gPage.grantDetails.guidelines.criteria.text,
      testData.grantGuidelinesCriteriaText,
      page
    )
    await page.click(gPage.grantDetails.guidelines.process.title, {
      clickCount: 3
    })
    await page.type(
      gPage.grantDetails.guidelines.process.title,
      testData.grantGuidelinesProcessTitle
    )
    await utils.setWysiwygText(
      gPage.grantDetails.guidelines.process.text,
      testData.grantGuidelinesProcessText,
      page
    )
    await page.click(gPage.grantDetails.guidelines.howToApply.title, {
      clickCount: 3
    })
    await page.type(
      gPage.grantDetails.guidelines.howToApply.title,
      testData.grantGuidelinesHowToApplyTitle
    )
    await utils.setWysiwygText(
      gPage.grantDetails.guidelines.howToApply.text,
      testData.grantGuidelinesHowToApplyText,
      page
    )

    // Grant author
    await page.click(gPage.tabs.grantAuthor)
    await page.type(gPage.grantAuthor.fullName, testData.grantAuthorFullName)
    await page.type(gPage.grantAuthor.email, testData.grantAuthorEmail)
    await page.type(gPage.grantAuthor.phone, testData.grantAuthorPhone)
    await page.type(
      gPage.grantAuthor.department,
      testData.grantAuthorDepartment
    )

    // Set moderation state to published
    await page.select(this.pageModels.common.moderationState, 'published')

    // Submit
    await this.submitPage()

    // get nodeid
    await page.waitForSelector('#drupal-live-announce', this.options.wait)
    const nodeId = await page.$eval('.tabs__tab .is-active', el =>
      el
        .getAttribute('data-drupal-link-system-path')
        .split('/')
        .pop()
    )
    await this.close()

    // Return nodeId
    return Promise.resolve(nodeId)
  }

  async createEventPage (testData) {
    if (!testData) return null
    // create browser and page
    const page = await this.setup()
    const ePage = this.pageModels['eventPage']

    // Login
    await this.login()

    // Create Event page
    await page.goto(`${this.backendURL}/node/add/event`)
    await page.waitForSelector('#drupal-live-announce', this.options.wait)
    await page.type(this.pageModels.common.title, testData.title)
    await page.type(this.pageModels.common.summary, testData.summary)
    await page.type(this.pageModels.common.topic, testData.topic)
    await page.click(this.pageModels.common.primarySite(testData.siteNumber))
    await page.click(this.pageModels.common.siteCheckbox(testData.siteNumber))
    await utils.setWysiwygText(ePage.description, testData.description, page)

    // Body content tab
    await page.click(ePage.tabs.bodyContent)
    await utils.setWysiwygText(
      ePage.bodyContent.body,
      testData.bodyContent.body,
      page
    )
    await utils.addWysiwygMediaEmbed(ePage.bodyContent.body, 'image', 1, page)
    await page.type(ePage.bodyContent.startDate, testData.bodyContent.startDate)
    await page.type(ePage.bodyContent.startTime, testData.bodyContent.startTime)
    await page.type(ePage.bodyContent.endDate, testData.bodyContent.endDate)
    await page.type(ePage.bodyContent.endTime, testData.bodyContent.endTime)
    await page.type(
      ePage.bodyContent.streetAddress,
      testData.bodyContent.streetAddress
    )
    await page.type(ePage.bodyContent.suburb, testData.bodyContent.suburb)
    await page.type(ePage.bodyContent.state, testData.bodyContent.state)
    await page.type(
      ePage.bodyContent.postalCode,
      testData.bodyContent.postalCode
    )
    await page.type(ePage.bodyContent.price, testData.bodyContent.price)
    await page.type(ePage.bodyContent.priceTo, testData.bodyContent.priceTo)
    await page.type(
      ePage.bodyContent.eventRequirements,
      testData.bodyContent.eventRequirements
    )
    await page.type(ePage.bodyContent.bookUrl, testData.bodyContent.bookUrl)
    await page.type(ePage.bodyContent.linkText, testData.bodyContent.linkText)
    await page.type(
      ePage.bodyContent.eventCategory,
      testData.bodyContent.eventCategory
    )
    await page.type(ePage.bodyContent.audience, testData.bodyContent.audience)
    await page.type(
      ePage.bodyContent.websiteUrl,
      testData.bodyContent.websiteUrl
    )

    // Event content tab
    await page.click(ePage.tabs.eventAuthor)
    await page.type(ePage.eventAuthor.fullName, testData.eventAuthor.fullName)
    await page.type(
      ePage.eventAuthor.emailAddress,
      testData.eventAuthor.emailAddress
    )
    await page.type(
      ePage.eventAuthor.contactPhone,
      testData.eventAuthor.contactPhone
    )

    // Set moderation state to published
    await page.select(this.pageModels.common.moderationState, 'published')

    // Submit
    await this.submitPage()

    // get nodeid
    await page.waitForSelector('#drupal-live-announce', this.options.wait)
    const nodeId = await page.$eval('.tabs__tab .is-active', el =>
      el
        .getAttribute('data-drupal-link-system-path')
        .split('/')
        .pop()
    )
    await this.close()

    // Return nodeId
    return Promise.resolve(nodeId)
  }

  async createUserRole (role) {
    if (!role) return Promise.reject(new Error('no role defined'))
    try {
      const page = await this.setup()
      const createRolePage = this.pageModels['createRolePage']
      await this.login()
      await page.goto(`${this.backendURL}/admin/people/roles/add`)
      await page.type(createRolePage.role, role)
      await page.type(createRolePage.id, role)

      // Submit
      await this.submitPage()
      const createdRole = await page.$eval('.messages em', el => el.textContent)
      await this.close()

      // Return createdRole
      return Promise.resolve(createdRole)
    } catch (error) {
      return Promise.reject(new Error('could not create role', error))
    }
  }

  async configureAuthContent (options) {
    if (!options) return Promise.reject(new Error('could not configure auth content: role or term not defined'))
    try {
      const page = await this.setup()
      const configureAuthContentPage = this.pageModels['configureAuthContent']
      await this.login()
      await page.goto(`${this.backendURL}/admin/structure/taxonomy/manage/authenticated_content/add`)
      await page.type(configureAuthContentPage.termName, options.term)
      await page.click(configureAuthContentPage.access)
      await page.waitFor(2000)
      await page.click(configureAuthContentPage.role(options.role))
      // Submit
      await this.submitPage()
      await this.close()
    } catch (error) {
      console.log(error)
      return Promise.reject(new Error('could not configure auth content', error))
    }
  }

  async createUser (user) {
    if (!user) return null

    const page = await this.setup()
    const createUserPage = this.pageModels['createUser']

    await this.login()

    await page.goto(`${this.backendURL}/admin/people/create`)
    await page.type(createUserPage.username, user.login)
    await page.type(createUserPage.email, user.email)
    await page.type(createUserPage.password, user.password)
    await page.waitFor(2000)
    await page.click(createUserPage.passwordConfirm)
    await page.waitFor(2000)
    await page.type(createUserPage.passwordConfirm, user.password)

    if (user.active) {
      await page.click(createUserPage.statusConfirmed)
    }
    if (user.role) {
      await page.click(createUserPage.editRole(user.role.toLowerCase()))
    }

    await page.waitFor(3000)

    // Submit
    await Promise.all([
      page.waitForNavigation(this.options.wait),
      await page.click(utils.dataSel('edit-submit'))
    ])

    // get userId
    await page.waitForSelector('#drupal-live-announce', this.options.wait)
    const userId = await page.$eval('.messages--status a', el =>
      el
        .getAttribute('href')
        .split('/')
        .pop()
    )

    // Cleanup
    await this.close()

    return userId
  }

  async deleteUser (userId) {
    if (userId) {
      try {
        const page = await this.setup()
        const deleteUserPage = this.pageModels['deleteUser']

        await this.login()
        await page.goto(`${this.backendURL}/user/${userId}/cancel`)
        await page.waitForSelector(
          deleteUserPage.deleteAccountAndContent,
          this.options.wait
        )
        await page.click(deleteUserPage.deleteAccountAndContent)
        await this.submitPage()
        await this.close()
        return Promise.resolve('ok')
      } catch (error) {
        return Promise.reject(new Error('could not create user'))
      }
    }
    return Promise.reject(new Error('no id'))
  }

  async deleteNode (id) {
    if (id) {
      const page = await this.setup()
      await this.login()

      await page.goto(`${this.backendURL}/node/${id}/delete`)
      await this.submitPage()
      await this.close()
      return Promise.resolve('ok')
    }
    return Promise.reject(new Error('no id'))
  }

  /**
   * Submit a page
   *
   * @returns
   */
  async submitPage () {
    return Promise.all([
      this.page.waitForNavigation(this.options.wait),
      await this.page.click(utils.dataSel('edit-submit'))
    ])
  }

  /**
   * Close the page and browser to clean up
   *
   * @returns
   */
  async close () {
    await this.page.close()
    await this.browser.close()
    return Promise.resolve()
  }

  async configureProtectedContent (options) {
    const jwtPage = this.pageModels.jwt
    const page = await this.setup()
    await this.login()

    let error = false

    await page.goto(`${this.backendURL}/admin/config/system/jwt`)
    const privateKey = await page.$eval(jwtPage.key, el => el.value)

    if (privateKey === 'authenticated_content') {
      await page.$eval(jwtPage.expiry, el => (el.value = '')) //eslint-disable-line
      await page.type(jwtPage.expiry, options.sessionExpiry)
      await this.submitPage()
    } else {
      error = 'no key set'
    }

    // await page.goto(`${backendURL}/admin/config/people/accounts`)
    // const adminApproval = await page.$eval(pageModels.accounts.adminApproval, el => {
    //   return el.getAttribute('checked') === 'checked'
    // })

    // if (!adminApproval) {
    //   await page.click(pageModels.accounts.adminApproval)
    //   await savePage(page)
    // }

    await this.close()

    if (error) {
      return Promise.reject(new Error(error))
    }
    return Promise.resolve('ok')
  }
}
