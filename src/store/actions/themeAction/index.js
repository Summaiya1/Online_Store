function updateTheme(theme) {
    console.log('action called ->', theme)
    return {
      type: 'UPDATE_THEME', //constant strings
      data: theme
    }
  }

  
//   function removeTheme() {
//     return {
//       type: 'REMOVE_THEME'
//     }
//   }
  
  export {
    updateTheme
  }
  