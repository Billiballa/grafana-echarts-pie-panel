'use strict';

System.register(['app/plugins/sdk', 'lodash', './libs/echarts', './libs/dark'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, _, echarts, _createClass, EchartsPieCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_lodash) {
            _ = _lodash.default;
        }, function (_libsEcharts) {
            echarts = _libsEcharts.default;
        }, function (_libsDark) {}],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('EchartsPieCtrl', EchartsPieCtrl = function (_MetricsPanelCtrl) {
                _inherits(EchartsPieCtrl, _MetricsPanelCtrl);

                function EchartsPieCtrl($scope, $injector) {
                    _classCallCheck(this, EchartsPieCtrl);

                    var _this = _possibleConstructorReturn(this, (EchartsPieCtrl.__proto__ || Object.getPrototypeOf(EchartsPieCtrl)).call(this, $scope, $injector));

                    var panelDefaults = {
                        EchartsOption: 'option = {}'
                    };

                    _.defaults(_this.panel, panelDefaults);

                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('panel-initialized', _this.render.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    return _this;
                }

                _createClass(EchartsPieCtrl, [{
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        this.data = dataList;
                        this.dataChanged();
                    }
                }, {
                    key: 'dataChanged',
                    value: function dataChanged() {
                        this.IS_DATA_CHANGED = true;
                        this.render();
                        this.IS_DATA_CHANGED = false;
                    }
                }, {
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.addEditorTab('Options', 'public/plugins/grafana-echarts-pie-panel/editor.html', 2);
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem, attrs, ctrl) {
                        var $panelContainer = elem.find('.echarts_container')[0];
                        var option = {},
                            echartsData = [],
                            echartsDataSum = NaN,
                            echartsLegend = [];

                        ctrl.IS_DATA_CHANGED = true;

                        //init height
                        var height = ctrl.height || panel.height || ctrl.row.height;
                        if (_.isString(height)) {
                            height = parseInt(height.replace('px', ''), 10);
                        }
                        height -= 5;
                        height -= ctrl.panel.title ? 24 : 9;
                        $panelContainer.style.height = height + 'px';

                        //init width
                        var width = document.body.clientWidth;
                        width = (width - 5.6 * 2) * ctrl.panel.span / 12 - 5.6 * 2 - 1 * 2 - 10 * 2;
                        $panelContainer.style.width = width + 'px';

                        //init echarts
                        var myChart = echarts.init($panelContainer, 'dark');

                        //设置echarts option中的data,legend,dataSum变量,可在render的eval中使用
                        function setDataOption() {
                            echartsData = [];
                            for (var i = 0; i < ctrl.data.length; i++) {
                                echartsData.push({
                                    name: ctrl.data[i].target,
                                    value: ctrl.data[i].datapoints[ctrl.data[i].datapoints.length - 1][0]
                                });
                            }
                        }

                        function setLegendOption() {
                            echartsLegend = [];
                            for (var i = 0; i < echartsData.length; i++) {
                                echartsLegend.push(echartsData[i].name);
                            }
                        }

                        function setDataSumOption() {
                            echartsDataSum = 0;
                            for (var i = 0; i < echartsData.length; i++) {
                                echartsDataSum += parseInt(echartsData[i].value);
                            }
                        }

                        function render() {
                            if (!myChart || !ctrl.data) {
                                return;
                            }
                            myChart.resize();
                            if (ctrl.IS_DATA_CHANGED) {
                                myChart.clear();
                                setDataOption();
                                setLegendOption();
                                setDataSumOption();
                            }
                            eval(ctrl.panel.EchartsOption);
                            myChart.setOption(option);
                        }

                        this.events.on('render', function () {
                            render();
                            ctrl.renderingCompleted();
                        });
                    }
                }]);

                return EchartsPieCtrl;
            }(MetricsPanelCtrl));

            _export('EchartsPieCtrl', EchartsPieCtrl);

            EchartsPieCtrl.templateUrl = 'module.html';
        }
    };
});
//# sourceMappingURL=echarts_pie_ctrl.js.map
