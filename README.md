# grafana-echarts-pie-panel
Echarts pie panel for grafana
## How Use
1. `$ npm install`
2. `$ grunt`
3. Restart **Grafana-server**.
4. Add a echarts panel.
5. Add your echarts option to **EchartsOption** in edit page.
## Tips
1. **dark.js** is the theme file ,If you want to customize theme.
2. Calling the timer function as the callback of **callInterval(callBack, interval)** function prevents it from being repeatedly triggered.
