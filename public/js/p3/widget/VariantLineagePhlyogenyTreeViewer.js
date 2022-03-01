define.amd.jQuery = true
define([
  'dojo/_base/declare', 'dijit/_WidgetBase', 'dojo/text!./templates/VariantLineagePhlyogenyTreeViewer.html', 'dijit/_TemplatedMixin',
  'dojo/request',
], function (
  declare, WidgetBase, Template, Templated,
  xhr
) {
  return declare([WidgetBase, Templated], {
    baseClass: 'VariantLineagePhlyogenyTreeViewer',
    disabled: false,
    templateString: Template,
    apiServiceUrl: window.App.dataAPI,
    constructor: function () {
    },
    isloaded: false,
    startup: function () {
      if (this._started) {
        return;
      }
      this.inherited(arguments);
      this.pre_build_options();
    },
    pre_build_options: function () {
      const options = {};
      options.alignPhylogram = false; // We should launch with "regular" phylogram.
      options.branchDataFontSize = 9;
      options.defaultFont = ['Arial', 'Helvetica', 'Times'];
      options.initialNodeFillColorVisualization = 'PANGO VOC';
      options.minBranchLengthValueToShow = 0.000001;
      options.minConfidenceValueToShow = 50;
      options.phylogram = true; // We should launch with "regular" phylogram.
      options.showConfidenceValues = false;
      options.showExternalLabels = true;
      options.showNodeName = true;
      options.showLineage = false;  // NEW as of 1.8.7b1
      options.showMutations = false; // NEW as of 1.8.7b1
      options.showNodeVisualizations = true;
      options.showSequence = false; // Do not show "Sequence" upon launch.
      options.showSequenceAccession = true; // If user turns on "Sequence" display, accession will be shown.
      options.searchProperties = true;
      options.searchIsPartial = false;
      options.showBranchEvents = false;
      options.showVisualizationsLegend = true;
      options.visualizationsLegendOrientation = 'vertical';
      options.visualizationsLegendXpos = 160;
      options.visualizationsLegendYpos = 30;

      const settings = {};
      settings.border = '1px solid #909090';
      settings.controls0Top = 10;
      settings.controls1Top = 10; // Should have both boxes in line.
      // settings.displayHeight = 700;
      // settings.displayWidth = 1200;
      settings.enableAccessToDatabases = true;
      settings.enableCollapseByFeature = false;
      settings.enableDownloads = true;
      settings.enableNodeVisualizations = true;
      settings.enableDynamicSizing = true;
      settings.enableSpecialVisualizations2 = true;
      settings.enableSpecialVisualizations3 = true;
      settings.enableSpecialVisualizations4 = true;
      settings.nhExportWriteConfidences = true;
      settings.searchFieldWidth = '50px';
      settings.collapseLabelWidth = '36px';
      settings.textFieldHeight = '16px';
      settings.showLineageButton = true;
      settings.showMutationsButton = true;
      settings.showShortenNodeNamesButton = false;
      settings.showDynahideButton = false;
      settings.showSearchPropertiesButton = true;
      settings.dynamicallyAddNodeVisualizations = true;
      settings.propertiesToIgnoreForNodeVisualization = ['AccessionNumber', 'Mutation'];
      settings.filterValues = [{
        source: 'vipr:PANGO_Lineage',
        target: 'vipr:PANGO_Select_Lineage',
        pass: ['BA.1', 'BA.1.1', 'BA.2', 'B.1.1.7', 'B.1.351', 'P.1', 'B.1.617.2', 'B.1.1.529']
      }];

      const decorator = 'vipr:';

      const nodeVisualizations = {};

      nodeVisualizations['PANGO_Lineage'] = {
        label: 'PANGO Lineage',
        description: 'the PANGO Lineage',
        field: null,
        cladeRef: decorator + 'PANGO_Lineage',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['PANGO_Lineage_L0'] = {
        label: 'PANGO Lineage Lvl 0',
        description: 'the PANGO Lineage Level 0',
        field: null,
        cladeRef: decorator + 'PANGO_Lineage_L0',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['PANGO_Lineage_L1'] = {
        label: 'PANGO Lineage Lvl 1',
        description: 'the PANGO Lineage Level 1',
        field: null,
        cladeRef: decorator + 'PANGO_Lineage_L1',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['PANGO_Select_Lineage'] = {
        label: 'PANGO VOC',
        description: 'PANGO VOC',
        field: null,
        cladeRef: decorator + 'PANGO_Select_Lineage',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['Host'] = {
        label: 'Host',
        description: 'the host of the virus',
        field: null,
        cladeRef: decorator + 'Host',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category10',
        sizes: null
      };

      nodeVisualizations['Country'] = {
        label: 'Country',
        description: 'the country of the virus',
        field: null,
        cladeRef: decorator + 'Country',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['Year'] = {
        label: 'Year',
        description: 'the year of the virus',
        field: null,
        cladeRef: decorator + 'Year',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        colorsAlt: ['#000000', '#00FF00'],
        sizes: [10, 40]
      };

      nodeVisualizations['Region'] = {
        label: 'Region',
        description: 'the region of change',
        field: null,
        cladeRef: decorator + 'Region',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };


      const specialVisualizations = {};

      specialVisualizations['Mutations'] = {
        label: 'Mutations',
        applies_to_ref: decorator + 'Mutation',
        property_datatype: 'xsd:string',
        property_applies_to: 'node',
        color: '#0000FF',
        property_values: ['S:A1020D', 'S:A1056V', 'S:A1070S', 'S:A1078T', 'S:A1190S', 'S:A1222T', 'S:A123S', 'S:A163V', 'S:A215D', 'S:A243S',
          'S:A263V', 'S:A264V', 'S:A27S', 'S:A288T', 'S:A352V', 'S:A372P', 'S:A411S', 'S:A475V', 'S:A575S', 'S:A67-', 'S:A672V', 'S:A67D', 'S:A684V',
          'S:A688S', 'S:A688T', 'S:A694V', 'S:A783T', 'S:A829T', 'S:A871S', 'S:A892T', 'S:A903S', 'S:A944S', 'S:C1241S', 'S:C1243S', 'S:C1243Y', 'S:C1247Y',
          'S:C1253Y', 'S:C136-', 'S:C15-', 'S:C152W', 'S:C15S', 'S:D1127Y', 'S:D1139H', 'S:D1146Y', 'S:D1153Y', 'S:D1168G', 'S:D1184N', 'S:D1184Y', 'S:D1199Y',
          'S:D1257E', 'S:D1259V', 'S:D1260H', 'S:D1260Y', 'S:D138-', 'S:D138G', 'S:D178G', 'S:D178H', 'S:D215A', 'S:D215G', 'S:D228H', 'S:D253A', 'S:D287G',
          'S:D427G', 'S:D571Y', 'S:D574Y', 'S:D583E', 'S:D614N', 'S:D745G', 'S:D796N', 'S:D80A', 'S:D80H', 'S:D839V', 'S:D867Y', 'S:D88H', 'S:D936N', 'S:D979E',
          'S:E1111K', 'S:E1111Q', 'S:E1195Q', 'S:E1207D', 'S:E1258V', 'S:E1262D', 'S:E1262K', 'S:E154G', 'S:E154V', 'S:E156-', 'S:E180Q', 'S:E309K', 'S:E309Q',
          'S:E324V', 'S:E406D', 'S:E406Q', 'S:E554D', 'S:E554Q', 'S:E583Q', 'S:E654K', 'S:E654V', 'S:E661D', 'S:E780A', 'S:E780D', 'S:E780Q', 'S:E96D', 'S:E96V',
          'S:F1052Y', 'S:F1062L', 'S:F1075L', 'S:F1103L', 'S:F135-', 'S:F140L', 'S:F186S', 'S:F189L', 'S:F18L', 'S:F201L', 'S:F32L', 'S:F338L', 'S:F486L',
          'S:F59Y', 'S:F5L', 'S:F6V', 'S:F888L', 'S:G1124C', 'S:G1167A', 'S:G1167S', 'S:G1167V', 'S:G1171V', 'S:G1219V', 'S:G1223S', 'S:G1251V', 'S:G181A',
          'S:G184V', 'S:G199R', 'S:G219S', 'S:G252-', 'S:G261D', 'S:G261V', 'S:G35R', 'S:G446D', 'S:G446R', 'S:G482R', 'S:G485R', 'S:G72E', 'S:G72R', 'S:G75D',
          'S:G769R', 'S:G80D', 'S:G80N', 'S:G999C', 'S:H1058Y', 'S:H1083Q', 'S:H1101Q', 'S:H1118Y', 'S:H138D', 'S:H146R', 'S:H245N', 'S:H625Y', 'S:H681Y',
          'S:H69N', 'S:H69Q', 'S:H69Y', 'S:I1114S', 'S:I1130M', 'S:I1130V', 'S:I119V', 'S:I1221T', 'S:I1227T', 'S:I1232F', 'S:I197V', 'S:I233V', 'S:I68V',
          'S:I714V', 'S:I818V', 'S:I834V', 'S:I850L', 'S:I909V', 'S:I931V', 'S:K1038R', 'S:K1045T', 'S:K113N', 'S:K1181T', 'S:K1245R', 'S:K182R', 'S:K202T',
          'S:K278N', 'S:K300R', 'S:K439N', 'S:K444N', 'S:K537R', 'S:K558R', 'S:K77T', 'S:K921Q', 'S:K97E', 'S:K97M', 'S:K97N', 'S:L1049I', 'S:L1141W', 'S:L118F',
          'S:L1224S', 'S:L1244V', 'S:L1264V', 'S:L1265F', 'S:L141V', 'S:L179F', 'S:L189F', 'S:L18R', 'S:L216F', 'S:L229F', 'S:L241F', 'S:L242P', 'S:L244S', 'S:L249-',
          'S:L249F', 'S:L293H', 'S:L441F', 'S:L585F', 'S:L8V', 'S:L922F', 'S:L981F', 'S:M1050I', 'S:M1229L', 'S:M1237V', 'S:M731T', 'S:M900I', 'S:N1023D', 'S:N1074S',
          'S:N1158S', 'S:N1173K', 'S:N1187H', 'S:N1187Y', 'S:N1192S', 'S:N137-', 'S:N148T', 'S:N148Y', 'S:N185S', 'S:N188K', 'S:N20T', 'S:N211Y', 'S:N253D', 'S:N30K',
          'S:N354D', 'S:N370S', 'S:N417K', 'S:N450K', 'S:N460I', 'S:N460Y', 'S:N501H', 'S:N556K', 'S:N556Y', 'S:N641D', 'S:N679Y', 'S:N703D', 'S:N710S', 'S:N717S',
          'S:N74K', 'S:N751K', 'S:N81Y', 'S:N856S', 'S:N87I', 'S:P1162L', 'S:P139S', 'S:P174S', 'S:P251-', 'S:P251L', 'S:P25L', 'S:P25S', 'S:P330S', 'S:P384S',
          'S:P479L', 'S:P479S', 'S:P521R', 'S:P621S', 'S:P728S', 'S:P82L', 'S:P85S', 'S:Q1071H', 'S:Q1071L', 'S:Q1113K', 'S:Q1113L', 'S:Q1201R', 'S:Q1208R',
          'S:Q134R', 'S:Q14-', 'S:Q173K', 'S:Q239R', 'S:Q23H', 'S:Q314R', 'S:Q321-', 'S:Q414K', 'S:Q493E', 'S:Q498H', 'S:Q675K', 'S:Q677R', 'S:Q690L', 'S:Q954H',
          'S:R102G', 'S:R102S', 'S:R158S', 'S:R190K', 'S:R19I', 'S:R214H', 'S:R237S', 'S:R246G', 'S:R246K', 'S:R246T', 'S:R273K', 'S:R273S', 'S:R34C', 'S:R403K',
          'S:R408I', 'S:R408K', 'S:R634L', 'S:R646P', 'S:R681H', 'S:R681P', 'S:R682W', 'S:R765L', 'S:R78G', 'S:R78S', 'S:R847K', 'S:R905S', 'S:S1147A', 'S:S1239T',
          'S:S12C', 'S:S13C', 'S:S13G', 'S:S151T', 'S:S155R', 'S:S158R', 'S:S221A', 'S:S255P', 'S:S256L', 'S:S373L', 'S:S477I', 'S:S50L', 'S:S514F', 'S:S640P',
          'S:S673T', 'S:S680F', 'S:S689N', 'S:S691F', 'S:S704L', 'S:S732A', 'S:S735A', 'S:S813I', 'S:S884F', 'S:S929I', 'S:S937T', 'S:S940T', 'S:S94F', 'S:S982L',
          'S:T1009S', 'S:T1116N', 'S:T1120I', 'S:T1120S', 'S:T1273I', 'S:T22N', 'S:T240I', 'S:T250-', 'S:T250A', 'S:T250P', 'S:T259R', 'S:T284I', 'S:T307I', 'S:T323I',
          'S:T33A', 'S:T33I', 'S:T385S', 'S:T470K', 'S:T470N', 'S:T478A', 'S:T478I', 'S:T501Y', 'S:T547I', 'S:T547K', 'S:T549S', 'S:T553I', 'S:T604I', 'S:T618I',
          'S:T638A', 'S:T638I', 'S:T676S', 'S:T678I', 'S:T723I', 'S:T732A', 'S:T732S', 'S:T73I', 'S:T747I', 'S:T761I', 'S:T76S', 'S:T778I', 'S:T883I', 'S:T941A',
          'S:T95N', 'S:V1040F', 'S:V1128A', 'S:V1128I', 'S:V1164I', 'S:V1230M', 'S:V127F', 'S:V143D', 'S:V16-', 'S:V171I', 'S:V193L', 'S:V213G', 'S:V222A', 'S:V227L',
          'S:V308I', 'S:V327I', 'S:V362F', 'S:V36F', 'S:V382L', 'S:V395I', 'S:V3G', 'S:V483A', 'S:V622G', 'S:V635I', 'S:V687I', 'S:V687L', 'S:V6F', 'S:V772I',
          'S:V826L', 'S:V83-', 'S:V860I', 'S:Y1155F', 'S:Y138-', 'S:Y144H', 'S:Y265C', 'S:Y28F', 'S:Y28H', 'S:Y396H', 'S:Y449N', 'S:Y789H']
      };

      specialVisualizations['Convergent_Mutations'] = {
        label: 'Convergent Mutations',
        applies_to_ref: decorator + 'Mutation',
        property_datatype: 'xsd:string',
        property_applies_to: 'node',
        color: '#FF0000',
        property_values: ['S:A1020S', 'S:A1078S', 'S:A1087S', 'S:A1174V', 'S:A222V', 'S:A243-', 'S:A243V', 'S:A262S', 'S:A27V', 'S:A344S',
          'S:A348S', 'S:A475S', 'S:A520S', 'S:A522S', 'S:A522V', 'S:A570D', 'S:A623S', 'S:A623V', 'S:A626S', 'S:A647S', 'S:A653V', 'S:A67S',
          'S:A67V', 'S:A688V', 'S:A701T', 'S:A701V', 'S:A735S', 'S:A771S', 'S:A845S', 'S:A845V', 'S:A846S', 'S:A879S', 'S:A879V', 'S:A892S',
          'S:A892V', 'S:A899S', 'S:A982S', 'S:C1235F', 'S:C1236F', 'S:C1247F', 'S:C1250F', 'S:C136F', 'S:D1118H', 'S:D1118Y', 'S:D111N',
          'S:D1146H', 'S:D1163Y', 'S:D1259Y', 'S:D138H', 'S:D138Y', 'S:D178N', 'S:D215-', 'S:D215Y', 'S:D253G', 'S:D253N', 'S:D614G', 'S:D737Y',
          'S:D796G', 'S:D796H', 'S:D796Y', 'S:D808G', 'S:D80G', 'S:D80N', 'S:D80Y', 'S:D839Y', 'S:D936H', 'S:D936Y', 'S:D950H', 'S:D950N',
          'S:E1092K', 'S:E1202Q', 'S:E154K', 'S:E156G', 'S:E224Q', 'S:E484A', 'S:E484K', 'S:E484Q', 'S:E583D', 'S:E654Q', 'S:E96Q', 'S:F140-',
          'S:F157-', 'S:F157L', 'S:F157S', 'S:F306L', 'S:F490S', 'S:F565L', 'S:G1124V', 'S:G1219C', 'S:G156E', 'S:G252V', 'S:G257S', 'S:G339D',
          'S:G446S', 'S:G446V', 'S:G496S', 'S:G614D', 'S:G75R', 'S:G75V', 'S:G769V', 'S:G946V', 'S:H1101Y', 'S:H146Y', 'S:H245-', 'S:H245Y', 'S:H49Y',
          'S:H655Y', 'S:H681P', 'S:H681R', 'S:H69-', 'S:H950D', 'S:I1027T', 'S:I210-', 'S:I68-', 'S:I716T', 'S:I834T', 'S:I95T', 'S:K1045N', 'S:K1073N',
          'S:K1191N', 'S:K417N', 'S:K417T', 'S:K478T', 'S:K484E', 'S:K558N', 'S:K764N', 'S:K854N', 'S:L1063F', 'S:L141-', 'S:L141F', 'S:L176F', 'S:L18F',
          'S:L212I', 'S:L241-', 'S:L242-', 'S:L242F', 'S:L244-', 'S:L452M', 'S:L452Q', 'S:L452R', 'S:L54F', 'S:L5F', 'S:L822F', 'S:L8F', 'S:L938F', 'S:M1229I',
          'S:M1237I', 'S:M153I', 'S:M153T', 'S:M177I', 'S:M731I', 'S:N211-', 'S:N211K', 'S:N394S', 'S:N439K', 'S:N440K', 'S:N501T', 'S:N501Y', 'S:N679K',
          'S:N764K', 'S:N856K', 'S:N859T', 'S:N950D', 'S:N969K', 'S:N978S', 'S:P1112L', 'S:P1162S', 'S:P1263L', 'S:P139-', 'S:P217S', 'S:P26L', 'S:P26S',
          'S:P384L', 'S:P681H', 'S:P681L', 'S:P681R', 'S:P809S', 'S:P812L', 'S:P812S', 'S:P9L', 'S:Q1208H', 'S:Q173H', 'S:Q183H', 'S:Q271R', 'S:Q321L',
          'S:Q414R', 'S:Q493R', 'S:Q498R', 'S:Q52H', 'S:Q52R', 'S:Q613H', 'S:Q675H', 'S:Q675R', 'S:Q677H', 'S:Q804H', 'S:Q957L', 'S:Q957R', 'S:R102I',
          'S:R158-', 'S:R18L', 'S:R190S', 'S:R19T', 'S:R214L', 'S:R21I', 'S:R21T', 'S:R246-', 'S:R346K', 'S:R346S', 'S:R34P', 'S:R452L', 'S:R78M', 'S:S112L',
          'S:S1242I', 'S:S1252F', 'S:S12F', 'S:S13I', 'S:S151I', 'S:S221L', 'S:S247-', 'S:S247I', 'S:S254F', 'S:S255F', 'S:S371L', 'S:S373P', 'S:S375F',
          'S:S477N', 'S:S494P', 'S:S640F', 'S:S689I', 'S:S698L', 'S:S929T', 'S:S939F', 'S:S940F', 'S:S982A', 'S:S98F', 'S:T1027I', 'S:T1117I', 'S:T19I',
          'S:T19R', 'S:T20I', 'S:T20N', 'S:T22I', 'S:T236S', 'S:T250I', 'S:T299I', 'S:T29A', 'S:T29I', 'S:T385I', 'S:T417K', 'S:T478K', 'S:T478R', 'S:T572I',
          'S:T573I', 'S:T716I', 'S:T719I', 'S:T76I', 'S:T791I', 'S:T859I', 'S:T859N', 'S:T95A', 'S:T95I', 'S:V1104L', 'S:V1122L', 'S:V1133F', 'S:V1176F',
          'S:V1228L', 'S:V1264L', 'S:V143-', 'S:V143F', 'S:V16F', 'S:V213L', 'S:V289I', 'S:V308L', 'S:V367F', 'S:V367L', 'S:V483F', 'S:V503I', 'S:V622F',
          'S:V688A', 'S:V6I', 'S:V70-', 'S:V70F', 'S:V70I', 'S:W152C', 'S:W152L', 'S:W152R', 'S:W258L', 'S:W64R', 'S:Y138D', 'S:Y144-', 'S:Y144F', 'S:Y145-',
          'S:Y145H', 'S:Y248-', 'S:Y449H', 'S:Y453F', 'S:Y501N', 'S:Y505H', 'S:Y655H', 'S:Y796D']
      };

      specialVisualizations[decorator + 'PANGO_Lineage'] = {
        label: 'PANGO VOC',
        applies_to_ref: decorator + 'PANGO_Lineage',
        property_datatype: 'xsd:string',
        property_applies_to: 'node',
        color: '#FF0000',
        property_values: ['BA.1', 'BA.1.1', 'BA.2', 'B.1.1.7', 'B.1.351', 'P.1', 'B.1.617.2', 'B.1.1.529']
      };

      this.options = options;
      this.settings = settings;
      this.nodeVisualizations = nodeVisualizations;
      this.specialVisualizations = specialVisualizations;
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
      var nodeVisualizations = this.nodeVisualizations;
      var specialVisualizations = this.specialVisualizations;

      xhr.get(window.App.dataAPI + '/content/phyloxml_trees/SARS2_IT13_29400_09999_cdh_pango_4_MAFFT_05_GTR_fme_pdvxvm.xml')
        .then((data) => {
          var tree;
          try {
            tree = window.archaeopteryx.parsePhyloXML(data);
          }
          catch (e) {
            alert('error while parsing tree: ' + e);
          }
          if (tree) {
            try {
              window.archaeopteryx.launch('#phylogram1', tree, options, settings, nodeVisualizations, specialVisualizations);
            }
            catch (e) {
              alert('error while launching archaeopteryx: ' + e);
            }
          }
        })
    }
  });
});
