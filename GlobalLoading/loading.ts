// @/components/GlobalLoading/loading.ts
import { h, render } from 'vue'
import GlobalLoading from './GlobalLoading.vue'  // 正确路径

interface LoadingOptions {
  text?: string
  background?: string
  spinnerType?: 'circle' | 'dots' | 'default'
  fullscreen?: boolean
  lock?: boolean
  customClass?: string
}

interface LoadingInstance {
  close: () => void
}

class LoadingService {
  private instance: any = null
  private count = 0
  private container: HTMLElement | null = null
  
  private createInstance(options: LoadingOptions) {
    // 清理已存在的实例
    if (this.container) {
      this.container.remove()
    }
    
    this.container = document.createElement('div')
    
    const vnode = h(GlobalLoading, {
      ...options,
      visible: true,
    })
    
    render(vnode, this.container)
    document.body.appendChild(this.container)
    
    this.instance = vnode.component?.exposed || vnode.component?.proxy
    return this.instance
  }
  
  private toggleBodyLock(lock: boolean) {
    if (lock) {
      document.body.classList.add('loading-lock')
    } else {
      document.body.classList.remove('loading-lock')
    }
  }
  
  show(options: string | LoadingOptions = {}): LoadingInstance {
    this.count++
    
    if (this.count === 1) {
      const config = typeof options === 'string' ? { text: options } : options
      this.createInstance({
        fullscreen: true,
        lock: true,
        spinnerType: 'circle',
        ...config
      })
      
      this.toggleBodyLock(config.lock !== false)
    }
    
    return {
      close: () => {
        this.hide()
      }
    }
  }
  
  hide() {
    if (this.count <= 0) return
    
    this.count--
    
    if (this.count === 0) {
      if (this.container) {
        // 使用 setTimeout 确保动画完成
        setTimeout(() => {
          if (this.container) {
            render(null, this.container)
            this.container.remove()
            this.container = null
          }
          this.instance = null
          this.toggleBodyLock(false)
        }, 300)
      }
    }
  }
}

// 创建全局实例
const loadingService = new LoadingService()

export const LoadingPlugin = {
  install(app: any) {
    app.config.globalProperties.$loading = loadingService
    app.provide('loading', loadingService)
  }
}

export function useLoading() {
  return loadingService
}

export default loadingService
