/**
 * @type {Config}
 */
export default {
  extends: ['stylelint-config-gds/scss'],
  ignoreFiles: ['**/public/**', '**/package/**', '**/vendor/**'],

  rules: {
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ]
  }
}

/**
 * @import { Config } from 'stylelint'
 */
