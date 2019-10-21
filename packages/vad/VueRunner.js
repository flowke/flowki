const Runner = require('@fow/dev-utils/adf/Runner');
const path = require('path');
const DefineEntryPlugin = require('./DefineEntryPlugin');
const VueWebpackPlugin = require('./VueWebpackPlugin');
const WatchConfigPlugin = require('./WatchConfigPlugin');

module.exports = class VueRunner extends Runner{
  constructor(){
    super();

    this.setHooks({
      defineEntry: ['entryContainer']
    })

    new DefineEntryPlugin().run(this);
    new VueWebpackPlugin().run(this);
    new WatchConfigPlugin().run(this);
  }

  defineEntry(){

    let entries = [];

    this.hooks.defineEntry.call(entries);

    return entries

  }

  getUserOptions(){

    let configPath = path.resolve(this.runnerConfig.appRoot, 'config/config');

    configPath = require.resolve(configPath)

    delete require.cache[configPath]
 
    return require(configPath);
  }
}