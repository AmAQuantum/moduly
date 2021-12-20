//moduly. simple JS module manager for pure js files/scripts
//copyright by Quantum TM , AmACorporation(c)
//licence MIT public licence (on licence file)
var moduly = {

    //modules llist
    modules: {},
    //modules loader
    add : function(URL,name,callback){
        URL = new URL(URL);
        name = name || URL.pathname.split('/').pop().split('.').shift();
        //check if module already exist
        if(this.modules[name]){
            console.error('module '+name+' already exist');
            return false;
        }
        //create new module
        this.modules[name] = {
            name: name,
            URL: URL,
            loaded: false,
            callback: callback
        };
        //load module
        this.load(name);
    },
    //load module
    load : function(name){
        var module = this.modules[name];
        if(!module) return false;
        if(module.loaded) return false;
        //load module
        var script = document.createElement('script');
        script.src = module.URL.href;
        script.onload = function(){
            module.loaded = true;
            if(module.callback) module.callback();
        };
        document.body.appendChild(script);
    }

};
