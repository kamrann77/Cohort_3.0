import React from 'react'
import WelcomeBanner from './Components/WelcomeBanner'
import StatCards from './Components/StatCards'
import CategoryGrid from './Components/CategoryGrid'
import TopRated from './Components/TopRated'
import NewArrivals from './Components/NewArrivals'
import FeatureStrip from './Components/FeatureStrip'

const Home = () => {
    return (
        <div className='mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8'>
            <WelcomeBanner />
            <StatCards />
            <CategoryGrid />

            <div className='grid gap-6 lg:grid-cols-2'>
                <TopRated />
                <NewArrivals />
            </div>

            <FeatureStrip />
        </div>
    )
}

export default Home
