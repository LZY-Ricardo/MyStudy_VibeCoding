import { useEffect, useState } from 'react';
import './Weather.css';
import AMapLoader from '@amap/amap-jsapi-loader';

function Weather() {
    const [city, setCity] = useState('北京市')
    const [weather, setWeather] = useState({})
    const [future, setFuture] = useState([])
    const weekMap = {
        1: "周一",
        2: "周二",
        3: "周三",
        4: "周四",
        5: "周五",
        6: "周六",
        7: "周日",
    }

    useEffect(() => {
        window._AMapSecurityConfig = {
            securityJsCode: "9c8bb34fe38488b63f34a1e59d94e799",
        };
        AMapLoader.load({
            key: "47ff5efa6aca1514c209f6ce8c473bd3", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        })
            .then((AMap) => {
                // 高德地图插件已生效
                // 获取城市定位
                getLocalCity(AMap);
            })


    }, [])

    const getLocalCity = (AMap) => {
        AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch()
            citySearch.getLocalCity(function (status, result) {
                console.log(status);

                if (status === 'complete' && result.info === 'OK') {
                    // 查询成功，result即为当前所在城市信息
                    console.log(result.city)
                    setCity(result.city)
                    // 获取所在城市的天气
                    getWeather(AMap, result.city)
                    getFutureWeather(AMap, result.city)
                }
            })
        })
    }

    const getWeather = (AMap, myCity) => {
        //加载天气查询插件
        AMap.plugin("AMap.Weather", function () {
            //创建天气查询实例
            var weather = new AMap.Weather();
            //执行实时天气信息查询
            weather.getLive(myCity, function (err, data) {
                console.log(err, data);
                setWeather(data)
                //err 正确时返回 null
                //data 返回实时天气数据，返回数据见下表
            });
        });
    }

    const getFutureWeather = (AMap, myCity) => {
        //加载天气查询插件
        AMap.plugin("AMap.Weather", function () {
            //创建天气查询实例
            var weather = new AMap.Weather();
            //执行实时天气信息查询
            weather.getForecast(myCity, function (err, data) {
                console.log(err, data);
                //err 正确时返回 null
                //data 返回天气预报数据，返回数据见下表
                setFuture(data.forecasts)
                console.log(data.forecasts[0].week);
            });
        });
    }

    return (
        <div className="weather">
            <div className="hd">
                <div className="city">
                    <i className="iconfont icon-weizhi"></i>
                    {city}
                </div>
                <div className="changeCity">
                    <div className="changeCity-btn">
                        <i className="iconfont icon-24gf-city4"></i>
                        切换城市
                    </div>
                </div>
            </div>
            <div className="bd">
                <div className="today">
                    <div className="today-temperature">
                        <div className="temperature-info">{weather.temperature}℃</div>
                        <div className="weather-type">{weather.weather}</div>
                    </div>
                    <div className="today-message">
                        <ul>
                            <li>
                                <i className="iconfont icon-shidu"></i>
                                <p className='category'>湿度</p>
                                <p className='value'>{weather.humidity}</p>
                            </li>
                            <li>
                                <i className="iconfont icon-fengxiang"></i>
                                <p className='category'>风向</p>
                                <p className='value'>{weather.windDirection}</p>
                            </li>
                            <li>
                                <i className="iconfont icon-fengli"></i>
                                <p className='category'>风力</p>
                                <p className='value'>{weather.windPower}级</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="future">
                    <div className="title">三日天气预报</div>
                    <ul className='future-list'>
                        {future.length > 0 ? (
                            future.slice(1).map((item, index) => (
                                <li className="future-item" key={index}>
                                    <div className="week">{weekMap[item.week]}</div>
                                    <div className="pic">
                                        <img src={`/img/${item.dayWeather}.png`} alt={item.dayWeather} />
                                    </div>
                                    <div className="max-min">
                                        <div className="max">{item.dayTemp}℃ </div>
                                        <div className="min">/ {item.nightTemp}℃</div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="future-item">加载天气预报中...</li>
                        )}
                    </ul>
                </div>
                <div className="tendency">
                </div>
            </div>
            <div className="container"></div>
        </div>
    )
}

export default Weather;