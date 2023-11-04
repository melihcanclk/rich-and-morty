import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index.tsx'
import NotFound from './pages/NotFound/index.tsx'
import AllCharacters from './pages/AllCharacters/index.tsx'
import { UserProvider, FiltersProvider } from "@/context";
import '@/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FiltersProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="all-characters" element={<AllCharacters />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </FiltersProvider>
  </React.StrictMode >
)
