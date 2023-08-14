declare module '*.vue' {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMeta {
  env: {
    VITE_NAME:string,
    VITE_VERSION:string,
    VITE_FULL_NAME:string,
    VITE_API_URL:string,
    VITE_BOOTSTRAP_DOCS_LINK:string,
    VITE_SASS_COMPONENTS_PATH:string,
    VITE_PREVIEW_LINK:string,
    VITE_PURCHASE_LINK:string,
    VITE_YOUTUBE_LINK:string,
    VITE_GITHUB_LINK:string,
    VITE_TWITTER_LINK:string,
    VITE_INSTAGRAM_LINK:string,
    VITE_FACEBOOK:string,
    VITE_DRIBBBLE:string,
  } 
}

