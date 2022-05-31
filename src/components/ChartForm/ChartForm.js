import BarChart from '../BarChart/BarChart';
import LineChart from '../LineChart/LineChart';
import { useEffect, useState } from 'react';

import './ChartForm.scss';

const ChartForm = () => {
    const [selectedRadio, setSelectedRadio] = useState('bar');
    const [chartDataX, setChartDataX] = useState([]);
    const [chartDataY, setChartDataY] = useState([]);
    const [charInfo, setCharInfo] = useState({
        labels: chartDataX.map(item => item),
        datasets: [
          {
            label: "Goods",
            data: chartDataY.map(item => item),
            backgroundColor: ["#8FBC8F"],
            borderColor: "black",
            borderWidth: 3,
          }
        ]
    });

    const onValueChange = (e) => {
        setSelectedRadio(e.target.value);
    }

    const onUpdateXAxis = (e) => {
        setChartDataX(e.target.value.split(',').map((item) => item));
    }

    const onUpdateYAxis = (e) => {
        setChartDataY(e.target.value.split(',').map((item) => item));
    }

    useEffect(() => {
        setCharInfo({
            labels: chartDataX.map(item => item),
            datasets: [
                {
                  label: "Goods",
                  data: chartDataY.map(item => item),
                  backgroundColor: ["#8FBC8F"],
                  borderColor: "black",
                  borderWidth: 3,
                }
            ]
        })
    }, [chartDataX, chartDataY])

    return (
        <div className='chart-form'>
            <div className='chart-form__values'>
                <p>X axis labels:</p>
                <input 
                    id='xAxis' 
                    type='text' 
                    placeholder='X axis' 
                    autoComplete='off'
                    onBlur={onUpdateXAxis}
                    onKeyDown={(e) => {if (e.key === 'Enter') {
                        onUpdateXAxis(e)
                    }}}
                />
                <p>Y axis labels:</p>
                <input 
                    id='yAxis' 
                    type='text' 
                    placeholder='Y axis' 
                    autoComplete='off'
                    onBlur={onUpdateYAxis}
                    onKeyDown={(e) => {if (e.key === 'Enter') {
                        onUpdateYAxis(e)
                    }}}
                />
            </div>
            <div className='chart-form__chart'>
                {selectedRadio === 'bar' ? <BarChart chartData={charInfo}/> : <LineChart chartData={charInfo}/>}
            </div>
            <form className='chart-form__type'>
                <div className='chart-form__type_wrapper'>
                    <input 
                        id='barChart' 
                        type='radio'
                        value="bar"
                        checked={selectedRadio === 'bar'}
                        onChange={onValueChange}
                    />
                    <label>Bar chart</label>
                </div>
                <div className='chart-form__type_wrapper'>
                    <input 
                        id='lineChart' 
                        type='radio'
                        value="line"
                        checked={selectedRadio === 'line'}
                        onChange={onValueChange}
                    />
                    <label>Line chart</label>
                </div>
            </form>  
        </div>
    )
}

export default ChartForm;