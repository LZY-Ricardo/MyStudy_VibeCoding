import React, { Suspense } from 'react'
import LazyLoad from './MyLazyLoad'
import img from '/src/san.jpg'
import img2 from '/src/name.jpg'
// import Hello from './components/Hello'
const Hello = React.lazy(() => import('./components/Hello'))

export default function App() {
  return (
    <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
        <p>13</p>
        <p>14</p>
        <p>15</p>
        <p>16</p>
        <p>17</p>
        <p>18</p>
        <p>19</p>
        <p>20</p>
        <p>21</p>
        <p>22</p>
        <p>23</p>
        <p>24</p>
        <p>25</p>
        <p>26</p>
        <p>27</p>
        <p>28</p>
        <p>29</p>
        <p>30</p>
        <LazyLoad width={200} height={400} style={{backgroundColor: 'red'}} placeholder={<div>loading</div>} onContentVisible={() => console.log('visible')}>
            <Hello />
        </LazyLoad>
        <LazyLoad placeholder={<div>loading</div>} offset={100}>
            <img src={img} alt="" />
        </LazyLoad>
        <LazyLoad placeholder={<div>loading</div>}>
            <img src={img2} alt="" />
        </LazyLoad>
    </div>
  )
}
