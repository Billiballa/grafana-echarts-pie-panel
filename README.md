# grafana-echarts-pie-panel
Echarts pie panel for grafana
## How Use
1. Merge **./vendor** folder and **Grafana/public/vendor** folder(You can also download [echarts.js](http://echarts.baidu.com/download.html) and [dark.js](http://echarts.baidu.com/download-theme.html) to **Grafana/public/vendor/** and change `define(['exports', 'echarts'], factory);` to `define(['exports', 'vendor/echarts'], factory);` in dark.js.).
2. `$ npm install`
3. `$ grunt`
4. Start **Grafana-server**.
5. Add Echarts pie panel to your dashboard.
