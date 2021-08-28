define([
  'dojo/_base/declare', 'dijit/_WidgetBase', 'https://www.ebi.ac.uk/pdbe/pdb-component-library/js/pdbe-molstar-plugin-1.1.0.js', 'dojo/text!../templates/MolStarViewer.html', 'dijit/_TemplatedMixin',
  'dojo/request', 'dojo/dom-construct', 'dojo/_base/lang', 'dijit/layout/ContentPane', 'dojo/dom-class', 'dojo/on', 'dojo/topic', 'dijit/layout/BorderContainer'
], function (
  declare, WidgetBase, molstar, Template, Templated,
  xhr, domConstruct, lang, ContentPane, domClass, on, Topic, BorderContainer
) {
  return declare([BorderContainer, Templated], {
    baseClass: 'MolStarViewer',
    disabled: false,
    templateString: Template,
    apiServiceUrl: window.App.dataAPI,
    state: null,
    accession_id: '6M0J',  // default
    constructor: function (opts) {
      console.log('constructor opts', opts);
      opts = opts || {};
      var accessionId = opts.state.search;
      if (accessionId) {
        this.accession_id = accessionId.split('=')[1];
      }

      console.log('accessionId: ', accessionId);
      console.log('accession_id: ', this.accession_id);
    },
    isloaded: false,
    startup: function () {
      if (this._started) {
        return;
      }
      this.inherited(arguments);

      this.watch('state', lang.hitch(this, 'onSetState'));
      this.watch('accession_id', lang.hitch(this, 'onAccessionChange'));
       // this.load_once();
       // this.isloaded = true;

    },

    onSetState: function (attr, oldVal, state) {
      console.log('onSetState: ', state);
      if (!state) {
        return;
      }

      if (state.accession_id) {
        this.set('accession_id', state.accession_id);
      } 
    },

    onAccessionChange: function (attr, oldValue, newValue) {
      // console.log('JMOL accession changed to ' + JSON.stringify(newValue));
      if (newValue &&  (oldValue!= newValue)) {
        this.set('accession_id', newValue);
      }
    },

    _setStateAttr: function () {
      if (!this.isloaded) {
        this.load_once();
        this.isloaded = true;
      }
    },
    
    load_once: function () {
      var options = this.options;
      var settings = this.settings;
      var viewerInstance = new PDBeMolstarPlugin();
  
      //Set options (Checkout available options list in the documentation)
      var options = {
        moleculeId: this.accession_id.toLowerCase(),
        hideControls: false
      }
 
      this.containerPane = new ContentPane({ region: 'center' });// domConstruct.create("div", {id: this.id + "_canvas"}, this.domNode);
      this.structureDiv = domConstruct.create('div', { id: 'myViewer' }, this.containerPane.domNode);
      this.addChild(this.containerPane);

      console.log('this.structureDiv: ', this.structureDiv);
      
       console.log('viewerInstance: ', viewerInstance);
       console.log('this.structureDiv: ', this.structureDiv);
   
      //Get element from HTML/Template to place the viewer 
      var viewerContainer = document.getElementById('myViewer');
       console.log('viewerContainer: ', viewerContainer);
 
      //Call render method to display the 3D view
      //viewerInstance.render(viewerContainer, options);
      viewerInstance.render(this.structureDiv, options);
   }
  });
});
