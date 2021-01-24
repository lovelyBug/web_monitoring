<template>
  <div class="side-bar">
    <div class="logo-view">
      <img src="@/assets/images/monitoring.png" class="logo-img">
      Web监控
    </div>
    <div class="menus-view">
      <div
        v-for="menus in munuData"
        :key="menus.label"
        class="menus-item-view"
      >
        <a-popover v-if="menus.children && menus.children.length" placement="right">
          <template #content>
            <div style="display: flex; flex-direction: column;">
              <LinkItem
                v-for="menu in menus.children"
                :key="menu.label"
                :menu="menu"
              />
            </div>
          </template>
          <div class="link-text" type="link">{{ menus.label }}</div>
        </a-popover>
        <router-link v-else :to="menus.link" class="link-text" type="link">
          {{ menus.label }}
        </router-link>
        <div v-if="menus.children && menus.children.length" class="active-bar"/>
      </div>
    </div>
    <a-popover placement="rightBottom">
      <template #content>
        <div style="display: flex; flex-direction: column;">
          <LinkItem
            v-for="menu in userMenuData"
            :key="menu.label"
            :text="menu.label"
          />
        </div>
      </template>
      <img src="@/assets/images/avatar.jpg" class="avatar">
    </a-popover>
  </div>
</template>

<script>
import { ref } from 'vue'
import LinkItem from './LinkItem.vue'

export default {
  components: { LinkItem },
  setup() {
    const userMenuData = ref(
      [
        {
          label: '参数设置',
          link: ''
        },
        {
          label: '警报配置',
          link: ''
        },
        {
          label: '团队管理',
          link: ''
        },
        {
          label: '重新登录',
          link: ''
        },
        {
          label: '设置管理员',
          link: ''
        }
      ]
    )
    const munuData = ref(
      [
        {
          label: '首 页',
          link: '/',
        },
        {
          label: '概 览',
          link: '',
        },
        {
          label: '错 误',
          link: '',
          children: [
            {
              label: 'JS错误统计',
              link: '/js_err'
            },
            {
              label: 'API接口错误统计',
              link: ''
            },
            {
              label: '静态资源错误统计',
              link: ''
            }
          ]
        },
        {
          label: '性 能',
          link: '',
          children: [
            {
              label: '接口耗时分析',
              link: ''
            },
            {
              label: '页面性能分析',
              link: ''
            }
          ]
        },
        {
          label: '埋 点',
          link: '',
          children: [
            {
              label: '自定义埋点',
              link: ''
            },
            {
              label: '漏斗分析',
              link: ''
            }
          ]
        },
        {
          label: '用 户',
          link: '',
          children: [
            {
              label: '用户细查（有userId精确查找）',
              link: ''
            },
            {
              label: '用户细查（无userId查找）',
              link: ''
            }
          ]
        }
      ]
    )
    return {
      munuData,
      userMenuData
    }
  }
}
</script>

<style lang="less" scoped>
.side-bar {
  width: 80px;
  height: 100vh;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-right: 1px solid #E8E8EA;
  .logo-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    cursor: pointer;
    .logo-img {
      width: 40px;
      height: auto;
      margin-bottom: 4px;
    }
  }
  .menus-view {
    width: 100%;
    .menus-item-view {
      height: 48px;
      width: 100%;
      text-align: center;
      line-height: 48px;
      margin-top: 20px;
      cursor: pointer;
      position: relative;
      .link-text {
        color: #817fa6;
        font-size: 12px;
        width: 100%;
      }
      .active-bar {
        visibility: hidden;
        position: absolute;
        right: 0;
        bottom: 8px;
        width: 2px;
        height: 32px;
        background: #6130f5;
        border-radius: 20px 0px 0px 20px;
      }
      &:hover {
        background-color: rgba(130, 97, 247, .08);
        .active-bar {
          visibility: visible;
        }
        .link-text {
          color: #6130f5;
        }
      }
    }
  }
  .avatar {
    position: absolute;
    bottom: 37px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
