import { Friends } from './friend'

export interface Resource {
  name: string
  logo: string
  desc: string
  href: string
  tags?: string[]
}

export interface ResourceCategory {
  name: string
  resources: Resource[]
}

const friends: Resource[] = Friends.map(f => {
  return {
    ...f,
    name: f.title,
    desc: f.description,
    logo: f.avatar,
    href: f.website,
  }
})

export const resourceData: ResourceCategory[] = [
  {
    name: 'åé¾ð¨âð»',
    resources: friends,
  },
  {
    name: 'æ¯å¨å¿å·ð¥',
    resources: [
      {
        name: 'ç¨åæé',
        desc: 'ç¨åæéæ¯ä¸ä¸ªææ¯åå®¢å¹³å°ï¼æ¯ç¨åºååå¸èªå·±çææ¯æç« ãåäº«ç¥è¯çå°æ¹',
        logo: '/img/resource/juejin.png',
        href: 'https://juejin.cn/',
      },
      {
        name: 'OSS Insight',
        desc: 'Open Source Software Insight',
        logo: '/img/resource/ossinsight.png',
        href: 'https://ossinsight.io/',
      },
      {
        name: 'Javascript Weekly',
        desc: 'A newsletter of JavaScript articles, news and cool projects',
        logo: '/img/resource/javascript.svg',
        href: 'https://javascriptweekly.com/',
      },
      {
        name: 'State of JavaScript',
        desc: 'JavaScript çæç³»ç»çå¹´åº¦å¼åäººåè°æ¥',
        logo: '/img/resource/stateofjs.svg',
        href: 'https://stateofjs.com',
      },
      {
        name: 'åç«¯é£å ',
        desc: 'å¨å¨å°é²ï¼äººå·¥ç­éåç«¯åæ¯å¨ææ°èµè®¯ãââ ç± ç«¥æ¬§å·´ åä½',
        logo: '/img/resource/zhubai.png',
        href: 'https://hungryturbo.zhubai.love/',
      },
    ],
  },
  {
    name: 'ç«ç¹ð¥ï¸',
    resources: [
      {
        name: 'Developer Roadmap',
        desc: 'Roadmap to becoming a web developer.',
        logo: '/img/resource/roadmap.png',
        href: 'https://roadmap.sh/',
      },
      {
        name: 'JS delivr',
        desc: 'ä¸ä¸ªåè´¹çCDNå¼æºé¡¹ç®',
        logo: '/img/resource/jsdelivr.webp',
        href: 'https://www.jsdelivr.com/',
      },
      {
        name: 'Shields.io',
        desc: 'ä¸ºä½ çå¼æºé¡¹ç®çæé«è´¨éå°å¾½ç« å¾æ ',
        logo: '/img/resource/shields.png',
        href: 'https://shields.io/',
        tags: ['å¾æ ', 'é¦é¡µ'],
      },
      {
        name: 'namae',
        desc: 'namaeå¯è®©æ¨ç»æ¨çåºç¨ç¨åºãWebæå¡æç»ç»èµ·ä¸ä¸ªå¥½åå­',
        logo: '/img/resource/namae.png',
        href: 'https://namae.dev/',
        tags: ['èµ·å'],
      },
      {
        name: 'Quick Reference',
        desc: 'ä¸ºå¼åäººååäº«å¿«éåèå¤å¿æ¸åãéæ¥è¡¨ã',
        logo: '/img/resource/quick reference.svg',
        href: 'https://jaywcjlove.github.io/reference',
        tags: ['æå'],
      },
      {
        name: 'Can I use',
        desc: 'å¯¹æµè§å¨æ¯æç API å¼å®¹æ§æ¥è¯¢',
        logo: 'https://caniuse.com/img/favicon-128.png',
        href: 'https://caniuse.com',
        tags: ['æå'],
      },
      {
        name: 'NGINX éç½®',
        desc: 'éç½®é«æ§è½ãå®å¨ãç¨³å®çNGINXæå¡å¨çæç®åæ¹æ³',
        logo: '/img/resource/digitalocean.png',
        href: 'https://www.digitalocean.com/community/tools/nginx',
        tags: ['nginx'],
      },
      {
        name: 'BootCDN',
        desc: 'ç¨³å®ãå¿«éãåè´¹çåç«¯å¼æºé¡¹ç® CDN å éæå¡',
        logo: '/img/resource/bootcdn.png',
        href: 'https://www.bootcdn.cn/',
        tags: ['cdn'],
      },
      {
        name: 'é£äºåè´¹çç ',
        desc: 'åç°åè´¹å¯åç¨çèµæº',
        logo: 'https://img.thosefree.com/static/logo.png',
        href: 'https://www.thosefree.com/',
        tags: [''],
      },
      {
        name: 'æ­£åå¤§å¨',
        desc: 'ð¦ å¸¸ç¨æ­£åå¤§å¨, æ¯æweb / vscode / idea / Alfred Workflowå¤å¹³å°',
        logo: '/img/resource/any-rule.ico',
        href: 'https://any-rule.vercel.app/',
        tags: [''],
      },
    ],
  },
  {
    name: 'ææ¡£ð',
    resources: [
      {
        name: 'MDN',
        desc: 'ä»2005å¹´å¼å§è®°å½ç½ç»ææ¯ï¼åæ¬ CSSã HTML å JavaScriptã',
        logo: '/img/resource/mdn.png',
        href: 'https://developer.mozilla.org/zh-CN/',
        tags: ['Css', 'æç¨'],
      },
      {
        name: 'ES6 å¥é¨æç¨',
        desc: 'ãECMAScript 6 å¥é¨æç¨ãæ¯ä¸æ¬å¼æºç JavaScript è¯­è¨æç¨ï¼å¨é¢ä»ç» ECMAScript 6 æ°å¼å¥çè¯­æ³ç¹æ§',
        logo: '/img/resource/es6.png',
        href: 'https://es6.ruanyifeng.com/',
        tags: ['ææ¡£'],
      },
      {
        name: 'æ·±å¥çè§£ TypeScript',
        desc: 'ãTypeScript Deep Diveã æ¯ä¸æ¬å¾å¥½çå¼æºä¹¦ï¼ä»åºç¡å°æ·±å¥ï¼å¾å¨é¢çéè¿°äº TypeScript çåç§é­æ³ï¼ä¸ç®¡ä½ æ¯æ°æï¼è¿æ¯èé¸ï¼å®é½å°éåºä½ ',
        logo: '/img/resource/typescript.png',
        href: 'https://jkchao.github.io/typescript-book-chinese/',
        tags: ['ææ¡£'],
      },
      {
        name: 'Rustè¯­è¨å£ç»',
        desc: 'ä¸ä»½é«è´¨é Rust æç¨',
        logo: '/img/resource/rust.svg',
        href: 'https://course.rs',
        tags: ['ææ¡£'],
      },
    ],
  },
  {
    name: 'å·¥å·ð ï¸',
    resources: [
      {
        name: 'å¨çº¿å·¥å·',
        desc: 'å¨çº¿å·¥å·,å¼åäººåå·¥å·,ä»£ç æ ¼å¼åãåç¼©ãå å¯ãè§£å¯,ä¸è½½é¾æ¥è½¬æ¢,icoå¾æ å¶ä½,å­å¸çæ',
        logo: 'https://tool.lu/favicon.ico',
        href: 'https://tool.lu/',
        tags: ['å·¥å·'],
      },
      {
        name: 'èé¸å·¥å·',
        desc: 'èé¸å·¥å·ï¼ä¸ºå¼åè®¾è®¡äººåæä¾å¨çº¿å·¥å·ï¼æä¾å¨çº¿PHPãPythonã CSSãJS è°è¯ï¼ä¸­æç®ç¹ä½è½¬æ¢ï¼è¿å¶è½¬æ¢ç­å·¥å·',
        logo: '/img/resource/runoob.png',
        href: 'https://c.runoob.com/',
        tags: ['å·¥å·'],
      },
      {
        name: 'ProcessOn',
        desc: 'åè´¹å¨çº¿æµç¨å¾æç»´å¯¼å¾',
        logo: 'https://processon.com/favicon.ico',
        href: 'https://processon.com/',
        tags: ['å·¥å·', 'æç»´å¯¼å¾'],
      },
      {
        name: 'Terminal Gif Maker',
        desc: 'å¨çº¿çæ Terminal GIF',
        logo: 'https://www.terminalgif.com/favicon.ico',
        href: 'https://www.terminalgif.com',
        tags: [],
      },

      {
        name: 'AST Explorer',
        desc: 'ä¸ä¸ª Web å·¥å·ï¼ç¨äºæ¢ç´¢ç±åç§è§£æå¨çæç AST è¯­æ³æ ',
        logo: 'https://astexplorer.net/favicon.png',
        href: 'https://astexplorer.net/',
        tags: ['å·¥å·', 'æ ¼å¼è½¬æ¢'],
      },
      {
        name: 'transform',
        desc: 'åç±»æ°æ®æ ¼å¼ä¸å¯¹è±¡è½¬æ¢',
        logo: 'https://transform.tools/static/favicon.png',
        href: 'https://transform.tools',
        tags: ['å·¥å·', 'æ ¼å¼è½¬æ¢'],
      },
      {
        name: 'Hoppscotch',
        desc: 'å¼æº API å¼åçæç³»ç»',
        logo: '/img/resource/hoppscotch.png',
        href: 'https://hoppscotch.io/',
        tags: ['api'],
      },
      {
        name: 'JsonT.run',
        desc: 'ä¸ä¸ªç®æ´çå¨çº¿ JSON è§£æå¨',
        logo: 'https://www.jsont.run/favicon.ico',
        href: 'https://www.jsont.run/',
        tags: ['å·¥å·'],
      },
      {
        name: 'Apifox',
        desc: 'API ææ¡£ãAPI è°è¯ãAPI MockãAPI èªå¨åæµè¯',
        logo: '/img/resource/apifox.png',
        href: 'https://www.apifox.cn/',
        tags: ['å·¥å·'],
      },
    ],
  },
  {
    name: 'ä»£ç æç®¡',
    resources: [
      {
        name: 'GitHub',
        desc: 'å¨çæå¤§çè½¯ä»¶é¡¹ç®æç®¡å¹³å°ï¼åç°ä¼è´¨å¼æºé¡¹ç®',
        logo: 'https://github.githubassets.com/favicons/favicon.svg',
        href: 'https://github.com/',
        tags: ['GitHub', 'ä»£ç æç®¡'],
      },
      {
        name: 'Gitee',
        desc: 'èèéå¢å¨æ°ä¸ä»£æ°æ®å¯è§åè§£å³æ¹æ¡',
        logo: '/img/resource/gitee.ico',
        href: 'https://gitee.com/',
        tags: ['ä»£ç æç®¡'],
      },
      {
        name: 'Gitlab',
        desc: 'æ´å¿«å°äº¤ä»å®å¨ä»£ç ï¼é¨ç½²å°ä»»ä½äºï¼å¹¶æ¨å¨ä¸å¡ææ',
        logo: 'https://gitlab.com/uploads/-/system/group/avatar/6543/logo-extra-whitespace.png?width=64',
        href: 'https://gitlab.com/',
        tags: ['ä»£ç æç®¡'],
      },
      {
        name: 'Gitea',
        desc: 'Gitea æ¯ä¸ä¸ªå¼æºç¤¾åºé©±å¨çè½»éçº§ä»£ç æç®¡è§£å³æ¹æ¡ï¼åç«¯éç¨ Go ç¼åï¼éç¨ MIT è®¸å¯è¯.',
        logo: 'https://gitea.io/images/favicon.png',
        href: 'https://gitea.io/',
        tags: ['ä»£ç æç®¡'],
      },
      {
        name: 'Coding',
        desc: 'æä¾ä¸ç«å¼ç åç®¡çå¹³å°åäºåçå¼åå·¥å·ï¼è®©è½¯ä»¶ç åå¦åå·¥ä¸çäº§è¬ç®åé«æï¼å©åä¼ä¸æåç åç®¡çæè½',
        logo: '/img/resource/coding.png',
        href: 'https://coding.net/',
        tags: ['ä»£ç æç®¡'],
      },
    ],
  },
  {
    name: 'ç½ç«æç®¡',
    resources: [
      {
        name: 'Vercel',
        desc: 'Vercelå°æå¥½çå¼åäººåä½éªä¸å¯¹æç»ç¨æ·æ§è½çæ§çå³æ³¨ç¸ç»å',
        logo: 'https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/57x57.png',
        href: 'https://vercel.com',
        tags: ['ç½ç«æç®¡'],
      },
      {
        name: 'Netlify',
        desc: 'Netlify æ¯ä¸å®¶æä¾éæç½ç«æç®¡çäºå¹³å°ï¼æ¯æä» Github, GitLab, Bitbucket ç­ä»£ç ä»åºä¸­èªå¨æåä»£ç  ç¶åè¿è¡é¡¹ç®æååé¨ç½²ç­åè½',
        logo: '/img/resource/netlify.png',
        href: 'https://www.netlify.com',
        tags: ['ç½ç«æç®¡'],
      },
      {
        name: 'Coolify',
        desc: 'ä¸ä¸ªå¼æºåèªææç®¡ç Heroku/Netlify æ¿ä»£å',
        logo: '/img/resource/coolify.png',
        href: 'https://coolify.io',
        tags: ['ç½ç«æç®¡'],
      },
      {
        name: 'GitHub Codespace',
        desc: 'å¨çæå¤§çè½¯ä»¶é¡¹ç®æç®¡å¹³å°ï¼åç°ä¼è´¨å¼æºé¡¹ç®',
        logo: 'https://github.githubassets.com/favicons/favicon.svg',
        href: 'https://github.com/codespaces',
        tags: ['ç½ç«æç®¡'],
      },
      {
        name: 'Railway',
        desc: 'å¸¦ä¸ä½ çä»£ç ï¼å©ä¸äº¤ç»æä»¬ ',
        logo: '/img/resource/railway.png',
        href: 'https://railway.app/',
        tags: ['ç½ç«æç®¡'],
      },
      {
        name: 'Supabase',
        desc: 'Supabase æ¯ä¸ä¸ªå¼æºçåç«¯å³æå¡ï¼BaaSï¼å¹³å°ï¼å®å¯ä»¥å¸®å©å¼åèå¿«éæå»ºåºç¨ç¨åºï¼æ éç¼ååç«¯ä»£ç ã',
        logo: '/img/resource/supabase.png',
        href: 'https://supabase.com/',
        tags: ['BaaS'],
      },
    ],
  },
  {
    name: 'å¨çº¿ä»£ç ',
    resources: [
      {
        name: 'CodesandBox',
        desc: 'CodeSandboxæ¯ä¸ä¸ªå¨çº¿ä»£ç ç¼è¾å¨åååå·¥å·ï¼å¯ä»¥æ´å¿«å°åå»ºåå±äº«webåºç¨ç¨åº',
        logo: 'https://codesandbox.io/favicon.ico',
        href: 'https://codesandbox.io/',
        tags: ['å¨çº¿ä»£ç '],
      },
      {
        name: 'CodePen',
        desc: 'æ¯æå»ºãæµè¯ååç°åç«¯ä»£ç çæä½³åºæ',
        logo: 'https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico',
        href: 'https://codepen.io/',
        tags: ['å¨çº¿ä»£ç '],
      },
      {
        name: 'Stackblitz',
        desc: 'Stackblitzå¨æµç¨ä¸­ä¿æå³æ¶çå¼åä½éªãæ²¡ææ´å¤çå°æ¶å¨å­/æ/å®è£æ¬å°-åªéç¹å»ï¼å¹¶å¼å§ç¼ç ',
        logo: '/img/resource/stackblitz.png',
        href: 'https://stackblitz.com/',
        tags: ['å¨çº¿ä»£ç '],
      },
      {
        name: 'vscode.dev',
        desc: 'vscodeå®æ¹æä¾å¨çº¿Webçvscodeä»£ç ç¼åç½ç«',
        logo: 'https://vscode.dev/static/stable/favicon.ico',
        href: 'https://vscode.dev/',
        tags: ['å¨çº¿ä»£ç '],
      },
      {
        name: 'Sandpack',
        desc: 'ç¨äºåå»ºå®æ¶è¿è¡çä»£ç ç¼è¾ç»éª',
        logo: 'https://sandpack.codesandbox.io/favicon.ico',
        href: 'https://sandpack.codesandbox.io/',
        tags: ['å¨çº¿ä»£ç '],
      },
    ],
  },
  {
    name: 'Vue',
    resources: [
      {
        name: 'Vue.js',
        desc: 'æ¸è¿å¼ JavaScript æ¡æ¶',
        logo: 'https://vuejs.org/logo.svg',
        href: 'https://vuejs.org',
        tags: ['åç«¯', 'Vue', 'æ¡æ¶'],
      },
      {
        name: 'Nuxt',
        desc: 'ä½¿ç¨ Nuxt èªä¿¡å°æå»ºæ¨çä¸ä¸ä¸ª Vue.js åºç¨ç¨åºãä½¿ Web å¼åç®åèå¼ºå¤§ã',
        logo: '/img/resource/nuxt.svg',
        href: 'https://nuxt.com/',
        tags: ['åç«¯', 'Vue', 'ææ¡£', 'æ¡æ¶'],
      },
      {
        name: 'Pinia',
        desc: 'æ¨å°ä¼åæ¬¢ä½¿ç¨ç Vue ç¶æç®¡ç',
        logo: 'https://pinia.vuejs.org/logo.svg',
        href: 'https://pinia.vuejs.org/',
        tags: ['åç«¯', 'Vue', 'ææ¡£', 'æ¡æ¶'],
      },
      {
        name: 'VueUse',
        desc: 'åºæ¬ Vue åæå®ç¨ç¨åºçéå',
        logo: 'https://vueuse.org/favicon.ico',
        href: 'https://vueuse.org/',
        tags: ['åç«¯', 'Vue', 'ææ¡£', 'æ¡æ¶'],
      },
      {
        name: 'Vitest',
        desc: 'ä¸ä¸ª Vite åçååæµè¯æ¡æ¶ãå®å¾å¿«ï¼',
        logo: 'https://vitest.dev/favicon.ico',
        href: 'https://cn.vitest.dev/',
        tags: ['åç«¯', 'Vue', 'æ¡æ¶'],
      },
    ],
  },
  {
    name: 'React',
    resources: [
      {
        name: 'React',
        desc: 'ç¨äºæå»ºç¨æ·çé¢ç JavaScript åº',
        logo: 'https://reactjs.org/favicon.ico',
        href: 'https://reactjs.org',
        tags: ['åç«¯', 'React', 'æ¡æ¶'],
      },
      {
        name: 'Next.js',
        desc: 'Next.js ä¸ºæ¨æä¾çäº§ç¯å¢æéçææåè½ä»¥åæä½³çå¼åä½éªï¼åæ¬éæåæå¡å¨ç«¯èåæ¸²æã æ¯æ TypeScriptãæºè½åæåã è·¯ç±é¢åç­åè½ æ éä»»ä½éç½®',
        logo: 'https://nextjs.org/static/favicon/favicon.ico',
        href: 'https://nextjs.org/',
        tags: ['åç«¯', 'React', 'æ¡æ¶'],
      },
      {
        name: 'Remix',
        desc: 'Remix æ¯ä¸ä¸ªå¨æ  Web æ¡æ¶ï¼å¯è®©æ¨ä¸æ³¨äºç¨æ·çé¢ï¼å¹¶éè¿ Web æ åè¿è¡åæº¯ï¼ä»¥æä¾å¿«éãæµçä¸æå¼¹æ§çç¨æ·ä½éª',
        logo: '/img/resource/remix.png',
        href: 'https://remix.run',
        tags: ['åç«¯', 'React', 'æ¡æ¶'],
      },
      {
        name: 'Ant Design Pro',
        desc: 'å¼ç®±å³ç¨çä¸­å°åç«¯/è®¾è®¡è§£å³æ¹æ¡',
        logo: 'https://pro.ant.design/favicon.png',
        href: 'https://pro.ant.design',
        tags: ['åç«¯', 'React', 'åå°', 'é¡¹ç®'],
      },
      {
        name: 'react-use',
        desc: 'ä¸ä¸ªå¼ºå¤§ç React Hooks åº',
        logo: 'https://reactjs.org/favicon.ico',
        href: 'https://github.com/streamich/react-use',
        tags: ['åç«¯', 'React', 'èææ¶'],
      },
      {
        name: 'ahooks',
        desc: 'ä¸ä¸ªé«è´¨éåå¯é ç React Hooks åº',
        logo: 'https://ahooks.js.org/simple-logo.svg',
        href: 'https://ahooks.js.org/',
        tags: ['åç«¯', 'React', 'èææ¶'],
      },
      {
        name: 'SWR',
        desc: 'ç¨äºæ°æ®è¯·æ±ç React Hooks åº',
        logo: '/img/resource/swr.png',
        href: 'https://swr.vercel.app/',
        tags: ['åç«¯', 'React', 'èææ¶'],
      },
      {
        name: 'react-spring',
        desc: 'éè¿ç®åçå¨ç»åºåä½¿æ¨çç»ä»¶æ ©æ ©å¦ç',
        logo: 'https://react-spring.dev/favicon.ico',
        href: 'https://react-spring.dev/',
        tags: ['åç«¯', 'React', 'å¨ç»'],
      },
      {
        name: 'UmiJS',
        desc: 'ç¨ Umi æå»ºä½ çä¸ä¸ä¸ªåºç¨ï¼å¸¦ç»ä½ ç®åèææ¦ç Web å¼åä½éª',
        logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
        href: 'https://umijs.org',
        tags: ['åç«¯', 'React', 'èææ¶'],
      },
    ],
  },
  {
    name: 'CSS',
    resources: [
      {
        name: 'TailwindCSS',
        desc: 'Tailwind CSS æ¯ä¸ä¸ªåè½ç±»ä¼åç CSS æ¡æ¶ï¼å®éæäºè¯¸å¦ flex, pt-4, text-center å rotate-90 è¿æ ·ççç±»ï¼å®ä»¬è½ç´æ¥å¨èæ¬æ è®°è¯­è¨ä¸­ç»åèµ·æ¥ï¼æå»ºåºä»»ä½è®¾è®¡',
        logo: 'https://www.tailwindcss.cn/favicon-32x32.png',
        href: 'https://www.tailwindcss.cn',
        tags: ['Css', 'æ¡æ¶'],
      },
      {
        name: 'WindiCSS',
        desc: 'Windi CSS æ¯ä¸ä¸ä»£å·¥å·ä¼åç CSS æ¡æ¶',
        logo: 'https://windicss.org/assets/logo.svg',
        href: 'https://windicss.org',
        tags: ['Css', 'æ¡æ¶'],
      },
      {
        name: 'Twind',
        desc: 'ç°å­æå°ãæå¿«ãåè½æé½å¨çå®æ´ Tailwind-in-JS è§£å³æ¹æ¡',
        logo: '/img/resource/twind.svg',
        href: 'https://github.com/tw-in-js/twind',
        tags: ['Css', 'æ¡æ¶'],
      },
      {
        name: 'UnoCSS',
        desc: 'å³æ¶æéåå­ CSS å¼æ',
        logo: 'https://uno.antfu.me//favicon.svg',
        href: 'https://uno.antfu.me/',
        tags: ['Css', 'æ¡æ¶'],
      },
      {
        name: 'Bootstrap',
        desc: 'Bootstrap æ¯å¨çæåæ¬¢è¿çåç«¯å¼æºå·¥å·åºï¼å®æ¯æ Sass åéå mixinãååºå¼æ æ ¼ç³»ç»ãèªå¸¦å¤§éç»ä»¶åä¼å¤å¼ºå¤§ç JavaScript æä»¶ãåºäº Bootstrap æä¾çå¼ºå¤§åè½ï¼è½å¤è®©ä½ å¿«éè®¾è®¡å¹¶å®å¶ä½ çç½ç«',
        logo: 'https://img.Victor.cn/20210907055816.png',
        href: 'https://v5.bootcss.com/',
        tags: ['Css', 'æ¡æ¶'],
      },
      {
        name: 'w3schools Css æç¨',
        desc: 'w3schools ä»åºç¡å°é«çº§çCSSæç¨',
        logo: 'https://www.w3schools.com/favicon.ico',
        href: 'https://www.w3schools.com/css',
        tags: ['Css', 'æ ·å¼'],
      },
      {
        name: 'CSS-Inspiration',
        desc: 'CSSçµæ',
        logo: '/img/resource/css-inspiration.png',
        href: 'https://csscoco.com/inspiration',
        tags: ['Css', 'æ ·å¼'],
      },
      {
        name: 'CSSå¸¸ç¨æ ·å¼',
        desc: 'CSSå¸¸ç¨æ ·å¼',
        logo: 'https://tse1-mm.cn.bing.net/th?id=OIP-C.EgSPriuEnAtlIWJV8R_E1QHaGs&w=107&h=100&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        href: 'https://github.com/QiShaoXuan/css_tricks',
        tags: ['Css', 'æ ·å¼'],
      },
      {
        name: 'CSSFX',
        desc: 'ä¸ä¸ªç²¾å¿å¶ä½çéåè®¾è®¡çéç¹æ¯æµå¨æ§ï¼ç®åæ§åæç¨æ§ãä½¿ç¨æå°æ è®°ç CSS æ¯æ',
        logo: '/img/resource/cssfx.png',
        href: 'https://cssfx.netlify.app/',
        tags: ['Css', 'æ ·å¼'],
      },
      {
        name: 'NES.css',
        desc: 'ä¸ä¸ªåç´ é£æ ¼çCSSæ¡æ¶',
        logo: 'https://nostalgic-css.github.io/NES.css/favicon.png',
        href: 'https://nostalgic-css.github.io/NES.css/',
        tags: ['Css', 'æ¡æ¶'],
      },
      {
        name: 'clay.css',
        desc: 'claymorphism æ³¥é¶æé£æ ¼CSS',
        logo: 'https://codeadrian.github.io/clay.css/apple-touch-icon.png',
        href: 'https://codeadrian.github.io/clay.css/',
        tags: ['Css', 'æ¡æ¶'],
      },
      {
        name: 'loading.io',
        desc: 'Animation Made Easy',
        logo: '/img/resource/loading.ico',
        href: 'https://loading.io/',
        tags: ['Css'],
      },
      {
        name: 'ç¥å¥UIæ ·å¼',
        desc: 'æä»¬èµäºä»»ä½äººåå»ºãåäº«åä½¿ç¨ç¨ CSS å HTML å¶ä½çæ¼äº®èªå®ä¹åç´ çæåã',
        logo: '/img/resource/uiverse.png',
        href: 'https://uiverse.io',
        tags: ['Css'],
      },
      {
        name: 'HYPE4',
        desc: 'éæç»çæçæå¨',
        logo: 'https://hype4.academy/_next/static/media/logorwd@2x.b40bc92c.png',
        href: 'https://hype4.academy/tools/glassmorphism-generator',
        tags: ['Css'],
      },
      {
        name: 'Omatsuri',
        desc: 'æ¶éä¸åçåçµæºï¼è®©æ¨ççæ´»æ´è½»æ¾ã',
        logo: 'https://omatsuri.app/assets/favicon.ico',
        href: 'https://omatsuri.app',
        tags: ['Css'],
      },
      {
        name: 'smooth shadow',
        desc: 'å¿«éè½»æ¾å°å®ç°åºäº CSS é´å½±çç»ä½³å·¥å·ãæ¨åªéè¦æå®ä¸äºé´å½±è®¾ç½®ï¼ä»£ç å°±å¨æ¨çè·¯ä¸ã',
        logo: 'https://shadows.brumm.af/favicon.svg',
        href: 'https://shadows.brumm.af/',
        tags: ['Css'],
      },
      {
        name: 'FANCY-BORDER-RADIUS',
        desc: 'è±å¼è¾¹çåå¾,æå©äºåå»º CSS è±å¼è¾¹æ¡ã',
        logo: 'https://9elements.github.io/fancy-border-radius/favicon-32x32.png',
        href: 'https://9elements.github.io/fancy-border-radius/',
        tags: ['Css'],
      },
      {
        name: 'Coolors',
        desc: 'åå»ºè°è²æ¿',
        logo: 'img/resource/coolors.png',
        href: 'https://coolors.co/',
        tags: ['Css'],
      },
    ],
  },
  {
    name: 'ç»ä»¶åº',
    resources: [
      {
        name: 'Element Plus',
        desc: 'åºäº Vue 3ï¼é¢åè®¾è®¡å¸åå¼åèçç»ä»¶åº',
        logo: 'https://element-plus.gitee.io/images/element-plus-logo-small.svg',
        href: 'https://element-plus.gitee.io/',
        tags: ['åç«¯', 'Vue', 'ç»ä»¶åº'],
      },
      {
        name: 'Naive UI',
        desc: 'ä¸ä¸ª Vue 3 ç»ä»¶åºæ¯è¾å®æ´ï¼ä¸»é¢å¯è°ï¼ä½¿ç¨ TypeScriptï¼å¿« æç¹ææ',
        logo: '/img/resource/naiveUI.svg',
        href: 'https://www.naiveui.com/',
        tags: ['ç»ä»¶åº', 'vue'],
      },
      {
        name: 'Ant Design',
        desc: 'ä¸å¥ä¼ä¸çº§ UIè®¾è®¡è¯­è¨å React ç»ä»¶åº',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        href: 'https://ant.design',
        tags: ['åç«¯', 'React', 'ç»ä»¶åº'],
      },
      {
        name: 'TDesign',
        desc: 'TDesign æ¯è¾è®¯åä¸å¡å¢éå¨æå¡ä¸å¡è¿ç¨ä¸­æ²æ·çä¸å¥ä¼ä¸çº§è®¾è®¡ä½ç³»',
        logo: 'https://tdesign.tencent.com/favicon.ico',
        href: 'https://tdesign.tencent.com/',
        tags: ['ç»ä»¶åº', 'react'],
      },
      {
        name: 'Arco Design',
        desc: 'å­èè·³å¨åºåçä¼ä¸çº§è®¾è®¡ç³»ç»',
        logo: 'https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico',
        href: 'https://arco.design/',
        tags: ['ç»ä»¶åº', 'react'],
      },
      {
        name: 'Vuetify',
        desc: 'Vuetify æ¯ä¸ä¸ª Vue UI åºï¼åå«æå·¥å¶ä½çç²¾ç¾ææç»ä»¶ãä¸éè¦è®¾è®¡æè½ - åå»ºä»¤äººæå¹çåºç¨ç¨åºæéçä¸åé½è§¦æå¯å',
        logo: 'https://vuetify.cn/favicon.ico',
        href: 'https://vuetify.cn/',
        tags: ['ç»ä»¶åº', 'react'],
      },
      {
        name: 'MUI',
        desc: 'å½ä¸æµè¡ç React UI æ¡æ¶',
        logo: 'https://mui.com/static/favicon.ico',
        href: 'https://mui.com',
        tags: ['åç«¯', 'React', 'ç»ä»¶åº'],
      },
      {
        name: 'VbenAdmin',
        desc: 'Vbenæ¯ä¸ä¸ªåºäºVue3ãViteãTypeScriptç­ææ°ææ¯æ å¼åçåå°ç®¡çæ¡æ¶',
        logo: '/img/resource/vben-admin.png',
        href: 'https://vvbin.cn/doc-next/',
        tags: ['åç«¯', 'Vue', 'åå°', 'é¡¹ç®'],
      },
    ],
  },
  {
    name: 'Frontend',
    resources: [
      {
        name: 'Component party',
        desc: 'åç«¯æ¡æ¶å¼Partyðï¼Web ç»ä»¶ JS æ¡æ¶éè¿å¶è¯­æ³åç¹æ§è¿è¡æ¦è¿°',
        logo: '/img/resource/component party.svg',
        href: 'https://component-party.dev/',
        tags: ['åç«¯', 'css', 'å¨ç»'],
      },
      {
        name: 'Lodash',
        desc: 'ä¸ä¸ª JavaScript çå®ç¨å·¥å·åº, è¡¨ç°ä¸è´æ§, æ¨¡åå, é«æ§è½, ä»¥åå¯æ©å±',
        logo: 'https://lodash.com/icons/favicon-32x32.png',
        href: 'https://lodash.net',
        tags: ['Nodejs'],
      },
      {
        name: 'WebAssembly',
        desc: 'wasm æ¯ä¸ä¸ªå¯ç§»æ¤ãä½ç§¯å°ãå è½½å¿«å¹¶ä¸å¼å®¹ Web çå¨æ°æ ¼å¼',
        logo: 'https://www.wasm.com.cn/favicon.ico',
        href: 'https://www.wasm.com.cn',
        tags: ['Nodejs'],
      },
      {
        name: 'Greensock',
        desc: 'è¶å¼ºå¤§h5å¨ç»åº',
        logo: 'https://greensock.com/favicon.ico',
        href: 'https://greensock.com/docs/',
        tags: ['åç«¯', 'css', 'å¨ç»'],
      },
      {
        name: 'Threejs',
        desc: 'å¼ºå¤§ç3D-Jsåº',
        logo: 'https://threejs.org/favicon.ico',
        href: 'https://threejs.org/',
        tags: ['åç«¯', 'JavaScript', '3D'],
      },
      {
        name: 'Jest',
        desc: 'Jest æ¯ä¸ä¸ªä»¤äººæå¿«ç JavaScript æµè¯æ¡æ¶ï¼æ³¨éç®åæ§ã',
        logo: '/img/resource/jest.png',
        href: 'https://jestjs.io/',
        tags: ['èªå¨åæµè¯'],
      },
      {
        name: 'Cypress',
        desc: 'å¯¹ä»»ä½å¨æµè§å¨ä¸­è¿è¡çä¸è¥¿è¿è¡å¿«éãç®ååå¯é çæµè¯ã',
        logo: '/img/resource/cypress.png',
        href: 'https://www.cypress.io/',
        tags: ['èªå¨åæµè¯'],
      },
      {
        name: 'Playwright',
        desc: 'Playwright ä¸ºç°ä»£ç½ç»åºç¨ç¨åºæä¾äºå¯é çç«¯å°ç«¯æµè¯ã',
        logo: '/img/resource/playwright.svg',
        href: 'https://playwright.dev/',
        tags: ['èªå¨åæµè¯'],
      },
    ],
  },
  {
    name: 'Node/Deno',
    resources: [
      {
        name: 'Node',
        desc: 'Node.js æ¯ä¸ä¸ªåºäº Chrome V8 å¼æç JavaScript è¿è¡æ¶',
        logo: 'https://nodejs.org/static/images/favicons/apple-touch-icon.png',
        href: 'http://nodejs.cn/',
        tags: ['åç«¯', 'Nodejs', 'ææ¡£'],
      },
      {
        name: 'Deno',
        desc: 'ä¸ä¸ªç°ä»£çJavaScriptåTypeScriptè¿è¡æ¶',
        logo: 'https://deno.land/logo.svg',
        href: 'https://bun.sh/',
        tags: ['Nodejs', 'Deno', 'JavaScript', 'TypeScript'],
      },
      {
        name: 'Bun',
        desc: 'Bun æ¯ä¸ä¸ªå¿«éçä¸ä½å JavaScript è¿è¡æ¶',
        logo: '/img/resource/bun.svg',
        href: 'https://bun.sh',
        tags: ['Nodejs', 'Deno', 'JavaScript', 'TypeScript'],
      },
      {
        name: 'NPM',
        desc: 'NPMæ¯ä¸çä¸æå¤§çåç®¡çå¨',
        logo: 'https://static.npmjs.com/58a19602036db1daee0d7863c94673a4.png',
        href: 'https://www.npmjs.com',
        tags: ['Nodejs', 'åç®¡ç', 'ææ¡£'],
      },
      {
        name: 'Yarn',
        desc: 'Yarn æ¯ä¸ä¸ªè½¯ä»¶åç®¡çå¨ï¼è¿å¯ä»¥ä½ä¸ºé¡¹ç®ç®¡çå·¥å·ãæ è®ºä½ æ¯å°åé¡¹ç®è¿æ¯å¤§ååä½ä»åºï¼monoreposï¼ï¼æ è®ºæ¯ä¸ä½ç±å¥½èè¿æ¯ä¼ä¸ç¨æ·ï¼Yarn é½è½æ»¡è¶³ä½ çéæ±',
        logo: 'https://www.yarnpkg.cn/favicon-32x32.png',
        href: 'https://www.yarnpkg.cn',
        tags: ['Nodejs', 'åç®¡ç', 'ææ¡£'],
      },
      {
        name: 'Pnpm',
        desc: 'éåº¦å¿«ãèçç£çç©ºé´çè½¯ä»¶åç®¡çå¨',
        logo: 'https://www.pnpm.cn/img/favicon.png',
        href: 'https://pnpm.io',
        tags: ['Nodejs', 'åç®¡ç', 'ææ¡£'],
      },
      {
        name: 'Node.jsææ¯æ ',
        desc: 'âNodejsææ¯æ â æ¯ä½è @äºæå ä»äº Node.js å¼åä»¥æ¥çå­¦ä¹ åç¨ï¼å¸æè¿äºåäº«è½å¸®å©å°æ­£å¨å­¦ä¹ ãä½¿ç¨ Node.js çæåä»¬',
        logo: 'https://nodejsred.oss-cn-shanghai.aliyuncs.com/nodejs_roadmap-logo.jpeg?x-oss-process=style/may',
        href: 'https://www.nodejs.red/',
        tags: ['Nodejs', 'ç¬è®°', 'æç¨'],
      },
      {
        name: 'Axios',
        desc: 'Axios æ¯ä¸ä¸ªåºäº promise çç½ç»è¯·æ±åºï¼å¯ä»¥ç¨äºæµè§å¨å node.js',
        logo: '/img/resource/axios.ico',
        href: 'https://axios-http.cn/',
        tags: ['Nodejs', 'HTTP'],
      },
      {
        name: 'Expressjs',
        desc: 'åºäº Node.js å¹³å°ï¼å¿«éãå¼æ¾ãæç®ç Web å¼åæ¡æ¶',
        logo: 'https://www.expressjs.com.cn/images/favicon.png',
        href: 'https://www.expressjs.com.cn/',
        tags: ['Nodejs', 'åç«¯', 'æ¡æ¶'],
      },
      {
        name: 'Nest.js',
        desc: 'ç¨äºæå»ºé«æä¸å¯ä¼¸ç¼©çæå¡ç«¯åºç¨ç¨åºçæ¸è¿å¼ Node.js æ¡æ¶',
        logo: 'https://docs.nestjs.cn/_media/icon.svg',
        href: 'https://docs.nestjs.cn/',
        tags: ['åç«¯', 'Nodejs', 'æ¡æ¶'],
      },
      {
        name: 'Fresh',
        desc: 'Deno ä¸ä¸ä»£ Web æ¡æ¶ï¼ä¸æ³¨äºéåº¦ãå¯é æ§åç®åæ§çæå»ºã',
        logo: '/img/resource/fresh.ico',
        href: 'https://fresh.deno.dev/',
        tags: ['Nodejs'],
      },
      {
        name: 'Socket.io',
        desc: 'Socket.IO æ¯ä¸ä¸ªå¯ä»¥å¨æµè§å¨ä¸æå¡å¨ä¹é´å®ç°å®æ¶ãååãåºäºäºä»¶çéä¿¡çå·¥å·åº',
        logo: 'https://socket.io/images/favicon.png',
        href: 'https://socketio.bootcss.com',
        tags: ['Nodejs', 'socket'],
      },
      {
        name: 'tRPC',
        desc: 'tRPC æ¯ä¸ä¸ªè½»éçº§çãç±»åå®å¨çè¿ç¨è¿ç¨è°ç¨æ¡æ¶ï¼å®ä½¿ç¨ TypeScript è¿è¡å¼åï¼å¯ä»¥å¸®å©å¼åèè½»æ¾å°ç¼ååé¨ç½²é«æ§è½çåå¸å¼åºç¨ç¨åºã',
        logo: 'https://trpc.io/img/logo.svg',
        href: 'https://trpc.io/',
        tags: ['Nodejs'],
      },
      {
        name: 'Strapi',
        desc: 'Socket.IO æ¯ä¸ä¸ªå¯ä»¥å¨æµè§å¨ä¸æå¡å¨ä¹é´å®ç°å®æ¶ãååãåºäºäºä»¶çéä¿¡çå·¥å·åº',
        logo: '/img/resource/strapi.png',
        href: 'https://strapi.io/',
        tags: ['Nodejs', 'CMS'],
      },
      {
        name: 'TypeORM',
        desc: 'TypeORM æ¯ä¸ä¸ª ORM æ¡æ¶ï¼å®å¯ä»¥è¿è¡å¨ NodeJSãBrowserãCordovaãPhoneGapãIonicãReact NativeãExpo å Electron å¹³å°ä¸ï¼å¯ä»¥ä¸ TypeScript å JavaScript (ES5,ES6,ES7,ES8)ä¸èµ·ä½¿ç¨',
        logo: '/img/resource/typeorm.ico',
        href: 'https://typeorm.bootcss.com',
        tags: ['Nodejs', 'ORM'],
      },
      {
        name: 'Prisma',
        desc: 'Prisma ä¸ä¸ä»£ Node.js å TypeScript çORMæ¡æ¶',
        logo: '/img/resource/prisma.png',
        href: 'https://prisma.io/',
        tags: ['Nodejs', 'ORM'],
      },
      {
        name: 'GraphQL',
        desc: 'GraphQL æ¢æ¯ä¸ç§ç¨äº API çæ¥è¯¢è¯­è¨ä¹æ¯ä¸ä¸ªæ»¡è¶³ä½ æ°æ®æ¥è¯¢çè¿è¡æ¶',
        logo: '/img/resource/graphQL.svg',
        href: 'https://graphql.cn',
        tags: ['Nodejs', 'GraphQL'],
      },
      {
        name: 'ECharts',
        desc: 'ä¸ä¸ªåºäº JavaScript çå¼æºå¯è§åå¾è¡¨åº',
        logo: 'https://echarts.apache.org/zh/images/favicon.png',
        href: 'https://echarts.apache.org/',
        tags: ['å¾è¡¨', 'å¯è§å'],
      },
      {
        name: 'AntV',
        desc: 'èèéå¢å¨æ°ä¸ä»£æ°æ®å¯è§åè§£å³æ¹æ¡,è®©æ°æ®æ ©æ ©å¦ç',
        logo: '/img/resource/antv.png',
        href: 'https://antv.vision/',
        tags: ['å¾è¡¨', 'å¯è§å'],
      },
    ],
  },
  {
    name: 'æå»ºå·¥å·',
    resources: [
      {
        name: 'Webpack',
        desc: 'webpack æ¯ä¸ä¸ªç°ä»£ JavaScript åºç¨ç¨åºçéææ¨¡åæåå¨(module bundler)ãå½ webpack å¤çåºç¨ç¨åºæ¶ï¼å®ä¼éå½å°æå»ºä¸ä¸ªä¾èµå³ç³»å¾(dependency graph)ï¼å¶ä¸­åå«åºç¨ç¨åºéè¦çæ¯ä¸ªæ¨¡åï¼ç¶åå°ææè¿äºæ¨¡åæåæä¸ä¸ªæå¤ä¸ª bundle',
        logo: '/img/resource/webpack.png',
        href: 'https://www.webpackjs.com',
        tags: ['æå»ºå·¥å·'],
      },
      {
        name: 'Rollup.js',
        desc: 'Rollup æ¯ JavaScript çæ¨¡åæåå¨ï¼å®å°å°æ®µä»£ç ç¼è¯ææ´å¤§ãæ´å¤æçä»£ç ï¼ä¾å¦åºæåºç¨ç¨åº',
        logo: 'https://rollupjs.org/favicon.png',
        href: 'https://rollupjs.org',
        tags: ['æå»ºå·¥å·'],
      },
      {
        name: 'Vite',
        desc: 'ä¸ä¸ä»£çåç«¯å·¥å·é¾ï¼ä¸ºå¼åæä¾æéååº',
        logo: '/img/resource/vite.svg',
        href: 'https://cn.vitejs.dev',
        tags: ['æå»ºå·¥å·'],
      },
      {
        name: 'Turborepo',
        desc: 'Turborepo æ¯ä¸ä¸ªç¨äº JavaScript å TypeScript ä»£ç åºçé«æ§è½æå»ºç³»ç»ã',
        logo: '/img/resource/turborepo.svg',
        href: 'https://turbo.build/repo',
        tags: ['æå»ºå·¥å·'],
      },
      {
        name: 'Turbopack',
        desc: 'Turbopack æ¯ä¸ä¸ªç¨ Rust ç¼åçéå¯¹ JavaScript å TypeScript ä¼åçå¢éå¼æç»åã',
        logo: '/img/resource/turbopack.svg',
        href: 'https://turbo.build/pack',
        tags: ['æå»ºå·¥å·'],
      },
      {
        name: 'SWC',
        desc: 'SWC æ¯ä¸ä¸ä»£å¿«éå¼åå·¥å·çå¯æ©å±çåºäº Rust çå¹³å°ã',
        logo: '/img/resource/swc.png',
        href: 'https://swc.rs/',
        tags: ['æå»ºå·¥å·'],
      },
    ],
  },
  {
    name: 'è®¾è®¡',
    resources: [
      {
        name: 'Mastergo',
        desc: 'é¢åå¢éçä¸ä¸ UI/UX è®¾è®¡å·¥å·ï¼å¤äººåæ¶ç¼è¾ãéæ¶å¨çº¿è¯å®¡ãè®¾è®¡ä¸é®äº¤ä»ï¼è®©æ³æ³æ´å¿«å®ç°',
        logo: 'https://mastergo.com/favicon.ico',
        href: 'https://mastergo.com/',
        tags: ['è®¾è®¡'],
      },
      {
        name: 'å³æ¶è®¾è®¡',
        desc: 'å¯äºç«¯ç¼è¾çä¸ä¸çº§ UI è®¾è®¡å·¥å·ï¼ä¸ºä¸­å½è®¾è®¡å¸éèº«æé ï¼Windows ä¹è½ç¨çãåä½ç Sketchã',
        logo: 'https://img.js.design/assets/webImg/favicon.ico',
        href: 'https://js.design/',
        tags: ['è®¾è®¡'],
      },
      {
        name: 'Figma',
        desc: 'Figma æ¯ä¸º UI è®¾è®¡èççè®¾è®¡å·¥å·ï¼é¤äºæå Sketch ä¸æ ·åºæ¬çæä½ååè½ï¼è¿æè®¸å¤ä¸ä¸º UI è®¾è®¡èççå¼ºå¤§åè½ã',
        logo: '/img/resource/figma.png',
        href: 'https://www.figma.com/',
        tags: ['è®¾è®¡'],
      },
      {
        name: 'Pixso',
        desc: 'ä¸ç«å¼å®æååãè®¾è®¡ãäº¤äºä¸äº¤ä»ï¼ä¸ºæ°å­åå¢éåä½ææ',
        logo: 'https://cms.pixso.cn/images/logo.svg',
        href: 'https://pixso.cn/',
        tags: ['è®¾è®¡'],
      },
    ],
  },
  {
    name: 'å­ä½å¾æ ',
    resources: [
      {
        name: 'iconify',
        desc: 'æ°åä¸ªå¾æ ï¼ä¸ä¸ªç»ä¸çæ¡æ¶',
        logo: 'https://icon-sets.iconify.design/favicon.ico',
        href: 'https://icon-sets.iconify.design/',
        tags: ['å¾æ '],
      },
      {
        name: 'icones',
        desc: 'Icon Explorer with Instant searching, powered by Iconify',
        logo: 'https://icones.js.org/favicon.svg',
        href: 'https://icones.js.org/',
        tags: ['å¾æ '],
      },
      {
        name: 'iconfont',
        desc: 'iconfont-å½ååè½å¾å¼ºå¤§ä¸å¾æ åå®¹å¾ä¸°å¯çç¢éå¾æ åºï¼æä¾ç¢éå¾æ ä¸è½½ãå¨çº¿å­å¨ãæ ¼å¼è½¬æ¢ç­åè½',
        logo: 'https://img.alicdn.com/imgextra/i4/O1CN01EYTRnJ297D6vehehJ_!!6000000008020-55-tps-64-64.svg',
        href: 'https://www.iconfont.cn/',
        tags: ['å¾æ '],
      },
      {
        name: 'feathericons',
        desc: 'ç®åç¾ä¸½çå¼æºå¾æ ',
        logo: 'https://feathericons.com/favicon.ico',
        href: 'https://feathericons.com/',
        tags: ['å¾æ '],
      },
      {
        name: 'undraw',
        desc: 'ä¸ä¸ªä¸æ­æ´æ°çè®¾è®¡é¡¹ç®ä¸ç¾ä¸½çSVGå¾åï¼ä½¿ç¨å®å¨åè´¹',
        logo: 'https://undraw.co/apple-touch-icon.png',
        href: 'https://undraw.co/',
        tags: ['æç»', 'svg'],
      },
      {
        name: 'igoutu',
        desc: 'å¾æ ãæå¾ãç§çãé³ä¹åè®¾è®¡å·¥å·',
        logo: '/img/resource/igoutu.png',
        href: 'https://igoutu.cn/',
        tags: ['æç»', 'svg'],
      },
      {
        name: 'Emojiall',
        desc: 'Emojiè¡¨æå¤§å¨',
        logo: 'https://www.emojiall.com/apple-touch-icon.png',
        href: 'https://www.emojiall.com/zh-hans',
        tags: ['å¾æ ', 'emoji'],
      },
      {
        name: 'æ¸åè²ç½ç«',
        desc: 'æ°ç¾ä¸ä¸ªèªå¨çæçæ¸åçç½ç«',
        logo: 'https://gradihunt.com/favicon.ico',
        href: 'https://gradihunt.com/',
        tags: ['éè²', 'èæ¯'],
      },
      {
        name: 'è°·æ­å­ä½',
        desc: 'ä¸ä¸ªçææ¸åè²èæ¯çç½ç«',
        logo: '/img/resource/google_fonts.ico',
        href: 'https://googlefonts.cn/',
        tags: ['å­ä½'],
      },
      {
        name: 'Typing SVG',
        desc: 'ä¸ä¸ªå¨æçæçå¯èªå®ä¹ SVG æå­ææ',
        logo: '/img/resource/typing-svg.png',
        href: 'https://readme-typing-svg.herokuapp.com/demo/',
        tags: ['å­ä½'],
      },
    ],
  },
  {
    name: 'è·¨å¹³å°',
    resources: [
      {
        name: 'Electron',
        desc: 'ä½¿ç¨ JavaScriptï¼HTML å CSS æå»ºè·¨å¹³å°çæ¡é¢åºç¨ç¨åº',
        logo: '/img/resource/electron.ico',
        href: 'https://www.electronjs.org/',
        tags: ['è·¨å¹³å°', 'Nodejs'],
      },
      {
        name: 'Tauri',
        desc: 'Tauriæ¯ä¸ä¸ªæ¡æ¶ï¼ç¨äºä¸ºææä¸»è¦æ¡é¢å¹³å°æå»ºå°å·§ãå¿«éçäºè¿å¶æä»¶',
        logo: 'https://tauri.app/meta/favicon-96x96.png',
        href: 'https://tauri.app/',
        tags: ['è·¨å¹³å°', 'Rust'],
      },
      {
        name: 'Flutter',
        desc: 'Flutter æ¯ Google å¼æºçåºç¨å¼åæ¡æ¶ï¼ä»éè¿ä¸å¥ä»£ç åºï¼å°±è½æå»ºç²¾ç¾çãåçå¹³å°ç¼è¯çå¤å¹³å°åºç¨',
        logo: 'https://flutter.cn/assets/images/cn/flutter-icon.png',
        href: 'https://flutter.cn/',
        tags: ['è·¨å¹³å°', 'Rust'],
      },
      {
        name: 'Uni-app',
        desc: 'uni-app æ¯ä¸ä¸ªä½¿ç¨ Vue.js å¼åææåç«¯åºç¨çæ¡æ¶ï¼å¼åèç¼åä¸å¥ä»£ç ï¼å¯åå¸å°iOSãAndroidãWebï¼ååºå¼ï¼ãä»¥ååç§å°ç¨åºï¼å¾®ä¿¡/æ¯ä»å®/ç¾åº¦/å¤´æ¡/QQ/å¿«æ/éé/æ·å®ï¼ãå¿«åºç¨ç­å¤ä¸ªå¹³å°',
        logo: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a90b5f95-90ba-4d30-a6a7-cd4d057327db/d23e842c-58fc-4574-998d-17fdc7811cc3.png',
        href: 'https://uniapp.dcloud.io/',
        tags: ['Vue', 'å°ç¨åº'],
      },
      {
        name: 'Taro',
        desc: 'Taro æ¯ä¸ä¸ªå¼æ¾å¼è·¨ç«¯è·¨æ¡æ¶è§£å³æ¹æ¡ï¼æ¯æä½¿ç¨ React/Vue/Nerv ç­æ¡æ¶æ¥å¼å å¾®ä¿¡ / äº¬ä¸ / ç¾åº¦ / æ¯ä»å® / å­èè·³å¨ / QQ / é£ä¹¦ å°ç¨åº / H5 / RN ç­åºç¨',
        logo: '/img/resource/taro.png',
        href: 'https://taro.jd.com',
        tags: ['åç«¯', 'React', 'å°ç¨åº'],
      },
    ],
  },
  {
    name: 'ç«ç¹çæ',
    resources: [
      {
        name: 'VitePress',
        desc: 'Vue é©±å¨å¹¶ä½¿ç¨Viteæå»ºçéæç½ç«çæå¨',
        logo: 'https://vuepress.vuejs.org/hero.png',
        href: 'https://vitepress.vuejs.org',
        tags: ['åç«¯', 'Vue', 'éæç«ç¹'],
      },
      {
        name: 'VuePress',
        desc: 'Vue é©±å¨çéæç½ç«çæå¨',
        logo: 'https://vuepress.vuejs.org/hero.png',
        href: 'https://vuepress.vuejs.org',
        tags: ['åç«¯', 'Vue', 'éæç«ç¹'],
      },
      {
        name: 'Docusaurus',
        desc: 'å¿«éæå»ºä»¥åå®¹ä¸ºæ ¸å¿çæä½³ç½ç«',
        logo: '/img/resource/docusaurus.svg',
        href: 'https://docusaurus.io',
        tags: ['åç«¯', 'React', 'éæç«ç¹'],
      },
      {
        name: 'Hexo',
        desc: 'å¿«éãç®æ´ä¸é«æçåå®¢æ¡æ¶',
        logo: 'https://hexo.io/favicon.ico',
        href: 'https://hexo.io',
        tags: ['åç«¯', 'éæç«ç¹'],
      },
      {
        name: 'GitBook',
        desc: 'GitBookå¸®å©æ¨ä¸ºç¨æ·åå¸æ¼äº®çææ¡£ï¼å¹¶éä¸­æ¨çå¢éçç¥è¯è¿è¡é«çº§åä½',
        logo: 'https://assets-global.website-files.com/600ead1452cf056d0e52dbed/6246d2036225eac4d74cff27_Favicon_Blue.png',
        href: 'https://www.gitbook.com/',
        tags: ['åç«¯', 'éæç«ç¹'],
      },
      {
        name: 'Docsify',
        desc: 'docsify å¯ä»¥å¿«éå¸®ä½ çæææ¡£ç½ç«',
        logo: 'https://docsify.js.org/_media/icon.svg',
        href: 'https://docsify.js.org',
        tags: ['åç«¯', 'éæç«ç¹'],
      },
      {
        name: 'WordPress',
        desc: 'WordPressæ¯ä¸æ¬¾è½è®©æ¨å»ºç«åºè²ç½ç«ãåå®¢æåºç¨ç¨åºçå¼æºè½¯ä»¶',
        logo: 'https://s.w.org/images/wmark.png',
        href: 'https://cn.wordpress.org/',
        tags: ['åç«¯', 'ç«ç¹'],
      },
    ],
  },
  {
    name: 'Github',
    resources: [
      {
        name: 'Gitstar Ranking',
        desc: 'éå¯¹ç¨æ·ãç»ç»åå­å¨åºçéå®æ¹ GitHub æçº§æå',
        logo: '/img/resource/github.ico',
        href: 'https://gitstar-ranking.com/',
        tags: [],
      },
      {
        name: 'Metrics',
        desc: 'Create your own metrics',
        logo: '/img/resource/github.ico',
        href: 'https://metrics.lecoq.io/',
        tags: [],
      },
      {
        name: 'Githubä¸»é¡µ README çæå¨',
        desc: 'ä¸ä¸ªGithub ä¸ªäººä¸»é¡µ README çæå¨',
        logo: '/img/resource/github.ico',
        href: 'https://rahuldkjain.github.io/gh-profile-readme-generator/',
        tags: [],
      },
      {
        name: 'Github ç»è®¡çæå¨',
        desc: 'Github å¨ä½ ç README ä¸­è·åå¨æçæç GitHub ç»è®¡ä¿¡æ¯ï¼',
        logo: '/img/resource/github.ico',
        href: 'https://github.com/anuraghazra/github-readme-stats',
        tags: [],
      },
    ],
  },
]
