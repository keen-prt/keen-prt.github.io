const getExternalUrl = () => {
  const URL = 'aHR0cHM6Ly9vc3ZhdWx0LmtlZW5ldGljcG9ydGVkLmRldg=='
  return atob(URL)
}

export function createGlobalUrlReplacer() {
  return {
    name: 'global-url-replacer',
    
    transform(code, id) {
      if (id.endsWith('.md')) {
        const externalBase = getExternalUrl()
        
        code = code.replace(
          /\[([^\]]+)\]\(\/assets\/files\/([^)]+)\)/g,
          (match, text, path) => {
            return `[${text}](${externalBase}/files/${path}){:target="_blank" rel="noopener noreferrer"}`
          }
        )
        
        code = code.replace(
          /(\/assets\/files\/[^\s\)]+)/g,
          (match) => {
            const path = match.replace('/assets/files/', '')
            return `${externalBase}/files/${path}`
          }
        )
      }
      return code
    },
    
    transformIndexHtml(html) {
      const externalBase = getExternalUrl()
      
      const scriptTag = `<script>window.__EXTERNAL_SERVER_URL__ = "${externalBase}";</script>`
      html = html.replace('</head>', `${scriptTag}</head>`)
      
      return html.replace(
        /href="\/assets\/files\/([^"]+)"/g,
        (match, path) => {
          return `href="${externalBase}/files/${path}" target="_blank" rel="noopener noreferrer"`
        }
      )
    }
  }
}

export function setupBrowserLinkReplacer() {
  if (typeof window === 'undefined') return
  
  const externalBase = getExternalUrl()
  
  const replaceLinks = () => {
    const links = document.querySelectorAll('a[href^="/assets/files/"]')
    links.forEach(link => {
      const originalHref = link.getAttribute('href')
      if (originalHref && originalHref.startsWith('/assets/files/')) {
        const path = originalHref.replace('/assets/files/', '')
        const newHref = `${externalBase}/files/${path}`
        link.setAttribute('href', newHref)
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
      }
    })
  }
  
  replaceLinks()
  const observer = new MutationObserver(replaceLinks)
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}