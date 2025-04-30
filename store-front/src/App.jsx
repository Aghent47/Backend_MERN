import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SearchResults } from './pages/SearchResults'
import { CreateProduct } from './pages/CreateProduct'
import { ProductDetail } from './pages/ProductDetail'
import './styles/global.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<SearchResults />} />
        <Route path="/items/:id" element={<ProductDetail />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </Router>
  )
}

export default App
