import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any
}

export interface State {
  componentConfig: {[key: string]: ComponentConfig}
}

export interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void
}

// 每一个名字对应的组件具体是哪一个
export const useComponentConfigStore = create<State & Action>(
  (set) => ({
    componentConfig: {
      Container: {
        name: 'Container',
        defaultProps: {},
        component: Container
      },
      Button: {
        name: 'Button',
        defaultProps: {
          type: 'primary',
          text: '按钮'
        },
        component: Button
      },
      Page: {
        name: 'Page',
        defaultProps: {},
        component: Page
      }
    },

    registerComponent: (name, componentConfig) => {  
      set((state) => {
        return {
          ...state,
          componentConfig: {
            ...state.componentConfig,
            [name]: componentConfig
          }
        }
      })
    }
  })
)

