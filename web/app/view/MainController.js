Ext.define('Traccar.view.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
   

    init: function () {
        var logo = document.createElement('img');
        logo.src = 'resources/mas.png';
        logo.className = "logo-map";
        var container = document.createElement('div');
        container.className = "logo-container-collapsed";
         container.id = "logo";
        container.appendChild(logo);
         document.body.appendChild(container);
    },


    onCollapseReports:function(){
        var container = document.getElementById('logo');
          container.className = 'logo-container-collapsed';

    },

    onExpandReports:function(){
          var container = document.getElementById('logo');
          container.className = 'logo-container-expanded';

    }
});