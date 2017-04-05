import _ from 'lodash';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
import echarts from 'vendor/echarts';
import 'vendor/dark';

export class EchartsPieCtrl extends MetricsPanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);

        const panelDefaults = {
            EchartsOption: 'option = {}'
        };

        _.defaults(this.panel, panelDefaults);

        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    }

    onDataReceived(dataList) {
        this.data = dataList;
        this.dataChanged();
    }

    dataChanged(){
        this.IS_DATA_CHANGED = true;
        this.render();
        this.IS_DATA_CHANGED = false;
    }

    onInitEditMode() {
        this.addEditorTab('Options', 'public/plugins/grafana-echarts-pie-panel/editor.html', 2);
    }

    link(scope, elem, attrs, ctrl) {
        const $panelContainer = elem.find('.echarts_container')[0];
        let option = {},
            echartsData = [],
            echartsDataSum = NaN,
            echartsLegend = [];

        ctrl.IS_DATA_CHANGED = true;

        //init height
        let height = ctrl.height || panel.height || ctrl.row.height;
        if (_.isString(height)) {
            height = parseInt(height.replace('px', ''), 10);
        }
        $panelContainer.style.height = height + 'px';

        //init width
        let width = document.body.clientWidth;
        width = (width - 5.6 * 2) * ctrl.panel.span / 12 - 5.6 * 2 - 1 * 2 - 10 * 2;
        $panelContainer.style.width = width + 'px';

        //init echarts
        let myChart = echarts.init($panelContainer, 'dark');

        //设置echarts option中的data,legend,dataSum变量,可在render的eval中使用
        function setDataOption() {
            echartsData = [];
            for (let i = 0; i < ctrl.data.length; i++) {
                echartsData.push({
                    name: ctrl.data[i].target,
                    value: ctrl.data[i].datapoints[ctrl.data[i].datapoints.length - 1][0]
                });
            }
        }

        function setLegendOption() {
            echartsLegend = [];
            for (let i = 0; i < echartsData.length; i++) {
                echartsLegend.push(echartsData[i].name);
            }
        }

        function setDataSumOption() {
            echartsDataSum = 0;
            for (let i = 0; i < echartsData.length; i++) {
                echartsDataSum += parseInt(echartsData[i].value);
            }
        }

        function render() {
            if (!myChart||!ctrl.data) {
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
}

EchartsPieCtrl.templateUrl = 'module.html';
