import { fireEvent, render, screen } from "@testing-library/react";
import { LayoutHeaderSearch } from "../components/LayoutHeaderSearch";


  const setup = () => {
    const utils = render(<LayoutHeaderSearch />)
    const input: any = screen.getByPlaceholderText(/Я ищу.../i);
    return {
      input,
      ...utils,
    }
  }


describe("LayoutSearchInput page", () => {
  it("Check LayoutSearchInput page in document", () => {
    const {input} = setup()
    expect(input).toBeInTheDocument();
  });
  test('It should allow a $ to be in the input when the value is changed', () => {
    const {input} = setup()
    fireEvent.change(input, {target: {value: '$23.0'}});
    expect(input.value).toBe('$23.0')
  });
  
  test('It should not allow letters to be inputted', () => {
    const {input} = setup()
    expect(input.value).toBe('') 
    fireEvent.change(input, {target: {value: 'Good Day'}})
    expect(input.value).toBe('Good Day') 
  })
  
  test('It should allow  to be deleted', () => {
    const {input} = setup()
    fireEvent.change(input, {target: {value: ''}})
    expect(input.value).toBe('')
  })
});
