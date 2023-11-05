import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound/index.tsx'
import '@/styles/global.scss'
import FiltersProvider from '@/providers/FiltersProvider.tsx'
import { Header } from './components/Header/index.tsx'
import Episode from './pages/Episode/index.tsx'
import Character from './pages/Character/index.tsx'
import Characters from './pages/Characters/index.tsx'
import Favorites from './pages/Favorites/index.tsx'
import MainLayout from './layout/MainLayout.tsx'
import Episodes from './pages/Home/index.tsx'
import Locations from './pages/Locations/index.tsx'
// TODO: COnvert them to relative paths

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FiltersProvider>
      <BrowserRouter>
        <Header />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Episodes />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path='/episode/:id' element={<Episode />} />
            <Route path='/characters' element={<Characters />} />
            <Route path='/character/:id' element={<Character />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/locations' element={<Locations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </FiltersProvider>
  </React.StrictMode >
)
