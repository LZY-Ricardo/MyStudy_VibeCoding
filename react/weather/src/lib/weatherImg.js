const qing = process.env.PUBLIC_URL + '/img/晴.png';
const leizhenyu = process.env.PUBLIC_URL + '/img/雷阵雨.png';
const duoyun = process.env.PUBLIC_URL + '/img/多云.png';

export function formatWeatherImg(str) {
    switch (str) {
        case '晴':
            return qing
        case '多云':
            return duoyun
        case '雷阵雨':
            return leizhenyu
    }
}

