import ChartOne from './ChartOne'
import ChartTwo from './ChartTwo'
import './style.css'
const Charts = () => {
    return (
        <div className="sectionCharts">
            <div className="containerCharts">
                <div className="chart-container">
                    <div id="canvas-containerTwo">
                        <ChartTwo/>
                    </div>
                </div>
            </div>
            <div className="containerCharts">
                <div className="chart-container">
                    <div id="canvas-container">
                        <ChartOne/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Charts