import { render, screen } from '@testing-library/react'
import { ShopHeaderLogo } from './ShopHeaderLogo'

const handleTestClick = () => {
  return 'test'
}

describe('ShopHeaderLogo page', () => {
  it('Check ShopHeaderLogo page in document', () => {
    render(<ShopHeaderLogo />)
    const rootId = screen.getByTestId('logo-testid')
    expect(rootId).toBeInTheDocument()
  })
  it('Check text ', () => {
    render(<ShopHeaderLogo />)
    const textLogo = screen.getByText(/Online/i)
    expect(textLogo).toBeInTheDocument()
  })

})



