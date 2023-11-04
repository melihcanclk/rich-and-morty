import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index.tsx'
import NotFound from './pages/NotFound/index.tsx'
import AllCharacters from './pages/AllCharacters/index.tsx'
import '@/styles/global.scss'
import FiltersProvider from '@/providers/FiltersProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <UserProvider> */}
    <FiltersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="all-characters" element={<AllCharacters />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FiltersProvider>
    {/* </UserProvider> */}
  </React.StrictMode >
)
