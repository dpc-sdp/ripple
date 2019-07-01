<template>
  <div class="tide-map-sidebar-home" ref="scrollElement">
    <tideMapSidebarHeader
      :title="headerTitle"
      :description="headerDescription"
      :showBackButton="showBackButton"
      :showHomeButton="showProjects"
      v-on:back-clicked="clickBack"
      v-on:home-clicked="clickHome"
      v-on:view-all-clicked="clickViewAll"
    />
    <div class="tide-map-sidebar-home__content">
      <div v-if="showProjects">
        <tideMapProjectCard
          v-for="(proj, index) in projectsToShow"
          @click="setProject"
          :key="index"
          :project="proj"
        />
      </div>

      <div v-if="showHome">
        <tideMapCategoriesPage
          :items="items"
          :isArea="!state.showCategories"
          v-on:clickShowArea="clickShowArea"
          v-on:clickShowCategories="clickShowCategories"
          v-on:clickCategory="setCategory"
        />
      </div>

      <div v-if="showSingleProject">
        <tideMapProjectDetails
          :project="selectedProject"
          @click="itemClicked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TideMapCard from './TideMapCard'
import TideMapProjectCard from './TideMapProjectCard'
import TideMapProjectDetails from './TideMapProjectDetails'
import TideMapSidebarHeader from './TideMapSidebarHeader'
import TideMapCategoriesPage from './TideMapCategoriesPage'
import { sortByTitle } from './helper'

export default {
  name: 'TideMapSidebarHome',
  components: {
    TideMapCard,
    TideMapProjectDetails,
    TideMapSidebarHeader,
    TideMapCategoriesPage,
    TideMapProjectCard
  },
  props: {
    categories: Array,
    areas: Array,
    projects: Array,
    selectedProjects: Array,
    parentSelectedProject: Array
  },
  data: function () {
    return {
      state: {
        showCategories: true,
        selectedCategory: null
      }
    }
  },
  computed: {
    selectedProject () {
      const { parentSelectedProject } = this
      return parentSelectedProject.length === 1
        ? parentSelectedProject[0]
        : null
    },
    items () {
      const {
        state: { showCategories },
        categories,
        areas
      } = this
      return sortByTitle(showCategories ? categories : areas)
    },
    showSingleProject () {
      const { selectedProject } = this
      return selectedProject !== null
    },
    showBackButton () {
      const { selectedProject, selectedProjects } = this
      return selectedProject !== null || selectedProjects.length > 0
    },
    showProjects () {
      const {
        state: { selectedCategory },
        selectedProject,
        selectedProjects
      } = this
      return (
        (selectedCategory !== null || selectedProjects.length > 1) &&
        selectedProject === null
      )
    },
    showHome () {
      const {
        state: { selectedCategory },
        selectedProject,
        selectedProjects
      } = this
      return (
        selectedProjects.length === 0 && !selectedProject && !selectedCategory
      )
    },
    headerTitle () {
      const {
        selectedProjects,
        selectedProject,
        state: { selectedCategory },
        showHome,
        projects
      } = this

      if (selectedProject !== null) {
        return selectedProject.title
      }

      const count = selectedProjects.length
      if (count > 1) {
        return `${count} Project${count === 1 ? '' : 's'} at this site`
      }

      if (selectedCategory !== null) {
        return selectedCategory.title
      }

      if (showHome) {
        return `${projects.length} family violence prevention projects across Victoria`
      }
    },
    projectsToShow () {
      const {
        state: { selectedCategory },
        projects,
        selectedProjects
      } = this
      if (selectedProjects.length > 0) {
        return sortByTitle(selectedProjects)
      }

      if (!selectedCategory) {
        return []
      }

      let projectsToShow = projects
      if (!selectedCategory.isAll) {
        if (selectedCategory.isArea) {
          projectsToShow = projects.filter(p =>
            p.areas.some(c => c.key === selectedCategory.key)
          )
        } else {
          projectsToShow = projects.filter(p =>
            p.categories.some(c => c.key === selectedCategory.key)
          )
        }
      }

      return sortByTitle(projectsToShow)
    },
    headerDescription () {
      const {
        state: { showCategories },
        showHome,
        selectedProject,
        selectedProjects,
        projectsToShow
      } = this

      if (showHome || selectedProject !== null || selectedProjects.length > 0) {
        return null
      }

      const count = projectsToShow.length
      const suffix = showCategories ? 'category' : 'area'
      const text = count === 1 ? 'project' : 'projects'
      return `${count} ${text} in this ${suffix}`
    }
  },
  methods: {
    clickHome () {
      this.state.selectedCategory = null
    },
    clickBack () {
      this.$emit('back-clicked')
    },
    clickViewAll () {
      // Dummying category to show all projects
      this.state.selectedCategory = {
        title: 'All projects',
        projects: this.projects,
        isAll: true
      }
    },
    itemClicked (item) {
      this.setProject()
      this.setCategory(item)
    },
    setCategory (cat) {
      this.scrollToTop()
      this.state.selectedCategory = cat
    },
    setProject (proj) {
      this.scrollToTop()
      this.$emit('set-selected-project', proj)
    },
    clickShowCategories () {
      this.scrollToTop()
      if (this.state.showCategories) {
        return
      }
      this.state.showCategories = !this.state.showCategories
    },
    clickShowArea () {
      this.scrollToTop()
      if (!this.state.showCategories) {
        return
      }
      this.state.showCategories = !this.state.showCategories
    },
    scrollToTop () {
      this.$refs.scrollElement.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

$tide-map-sidebar-home-background-color: rpl-color('mid_neutral_2') !default;

.tide-map-sidebar-home {
  height: 100%;
  overflow: auto;
  background-color: $tide-map-sidebar-home-background-color;
  .tide-map-sidebar-home__content {
    padding: $rpl-space-4;
    padding-top: $rpl-space-2;
  }
}
</style>
