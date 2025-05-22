import React from 'react';
jest.mock('@/components/atoms/CustomButton', () => ({
  __esModule: true,
  default: (props: any) => <button {...props}>{props.text}</button>,
}));
import { render, screen, fireEvent } from '@testing-library/react';
import FormFijo from '@/components/molecules/forms/FormFijo';

describe('FormFijo', () => {
  it('renderiza el botón de crear registro', () => {
    render(<FormFijo />);
    expect(screen.getByRole('button', { name: /crear registro/i })).toBeInTheDocument();
  });

  it('renderiza todas las opciones de tipo de producto', () => {
    render(<FormFijo />);
    const select = document.querySelector('select[name="tipo_producto"]')!;
    const options = Array.from(select.children).map((o: any) => o.textContent);
    expect(options).toEqual(expect.arrayContaining(['residencial', 'negocio']));
  });

  it('renderiza todas las opciones de estado', () => {
    render(<FormFijo />);
    const select = document.querySelector('select[name="estado"]')!;
    const options = Array.from(select.children).map((o: any) => o.textContent);
    expect(options).toEqual(expect.arrayContaining(['digitado', 'pendiente', 'instalado', 'legalizado']));
  });

  it('renderiza todas las opciones de total servicios', () => {
    render(<FormFijo />);
    const select = document.querySelector('select[name="total_servicios"]')!;
    const options = Array.from(select.children).map((o: any) => o.textContent);
    expect(options).toEqual(expect.arrayContaining(['1', '2', '3']));
  });

  it('renderiza todas las opciones de total adicionales', () => {
    render(<FormFijo />);
    const select = document.querySelector('select[name="total_adicionales"]')!;
    const options = Array.from(select.children).map((o: any) => o.textContent);
    expect(options).toEqual(expect.arrayContaining(['0', '1', '2', '3']));
  });

  it('muestra error si cuenta no es un número', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="cuenta"]')!, { target: { value: 'abc' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/expected number, received string/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si OT no es un número', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="OT"]')!, { target: { value: 'xyz' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/expected number, received string/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si vendedor_id no es un número', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="vendedor_id"]')!, { target: { value: 'abc' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/expected number, received string/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si ciudad está vacía', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="ciudad"]')!, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/ciudad/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si convergente está vacía', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="convergente"]')!, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/convergente/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si servicios adicionales está vacía', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="servicios_adicionales"]')!, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/servicios adicionales/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si estrato no está seleccionado', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('select[name="estrato"]')!, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/estrato/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si tipo de producto no está seleccionado', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('select[name="tipo_producto"]')!, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/tipo de producto/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si total servicios no está seleccionado', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('select[name="total_servicios"]')!, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/total servicios/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si total adicionales no está seleccionado', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('select[name="total_adicionales"]')!, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/total adicionales/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si estado no está seleccionado', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('select[name="estado"]')!, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/estado/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('permite ingresar valores máximos en cuenta y OT', () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="cuenta"]')!, { target: { value: '999999999' } });
    fireEvent.change(document.querySelector('input[name="OT"]')!, { target: { value: '999999999' } });
    expect(document.querySelector('input[name="cuenta"]')).toHaveValue(999999999);
    expect(document.querySelector('input[name="OT"]')).toHaveValue(999999999);
  });

  it('permite ingresar valores mínimos en cuenta y OT', () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="cuenta"]')!, { target: { value: '0' } });
    fireEvent.change(document.querySelector('input[name="OT"]')!, { target: { value: '0' } });
    expect(document.querySelector('input[name="cuenta"]')).toHaveValue(0);
    expect(document.querySelector('input[name="OT"]')).toHaveValue(0);
  });

  it('permite cambiar todas las opciones de selects', () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('select[name="estrato"]')!, { target: { value: '3' } });
    fireEvent.change(document.querySelector('select[name="tipo_producto"]')!, { target: { value: 'negocio' } });
    fireEvent.change(document.querySelector('select[name="total_servicios"]')!, { target: { value: '2' } });
    fireEvent.change(document.querySelector('select[name="total_adicionales"]')!, { target: { value: '2' } });
    fireEvent.change(document.querySelector('select[name="estado"]')!, { target: { value: 'pendiente' } });
    expect(document.querySelector('select[name="estrato"]')).toHaveValue('3');
    expect(document.querySelector('select[name="tipo_producto"]')).toHaveValue('negocio');
    expect(document.querySelector('select[name="total_servicios"]')).toHaveValue('2');
    expect(document.querySelector('select[name="total_adicionales"]')).toHaveValue('2');
    expect(document.querySelector('select[name="estado"]')).toHaveValue('pendiente');
  });

  it('permite ingresar caracteres especiales en convergente y ciudad', () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="convergente"]')!, { target: { value: 'Sí/No' } });
    fireEvent.change(document.querySelector('input[name="ciudad"]')!, { target: { value: 'Bogotá D.C.' } });
    expect(document.querySelector('input[name="convergente"]')).toHaveValue('Sí/No');
    expect(document.querySelector('input[name="ciudad"]')).toHaveValue('Bogotá D.C.');
  });

  it('permite ingresar servicios adicionales largos', () => {
    render(<FormFijo />);
    const value = 'servicio'.repeat(10);
    fireEvent.change(document.querySelector('input[name="servicios_adicionales"]')!, { target: { value } });
    expect(document.querySelector('input[name="servicios_adicionales"]')).toHaveValue(value);
  });

  it('permite ingresar cédula del cliente con muchos dígitos', () => {
    render(<FormFijo />);
    const value = '123456789012345';
    fireEvent.change(document.querySelector('input[name="cliente_cc"]')!, { target: { value } });
    expect(document.querySelector('input[name="cliente_cc"]')).toHaveValue(value);
  });

  it('permite ingresar vendedor_id con muchos dígitos', () => {
    render(<FormFijo />);
    const value = '123456789';
    fireEvent.change(document.querySelector('input[name="vendedor_id"]')!, { target: { value } });
    expect(document.querySelector('input[name="vendedor_id"]')).toHaveValue(Number(value));
  });

  it('permite cambiar fecha de instalación y legalización', () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="fecha_instalacion"]')!, { target: { value: '2025-05-22' } });
    fireEvent.change(document.querySelector('input[name="fecha_legalizacion"]')!, { target: { value: '2025-05-23' } });
    expect(document.querySelector('input[name="fecha_instalacion"]')).toHaveValue('2025-05-22');
    expect(document.querySelector('input[name="fecha_legalizacion"]')).toHaveValue('2025-05-23');
  });

  it('no muestra errores al enviar datos válidos', async () => {
    render(<FormFijo />);
    fireEvent.change(document.querySelector('input[name="fecha_instalacion"]')!, { target: { value: '2024-01-01' } });
    fireEvent.change(document.querySelector('input[name="fecha_legalizacion"]')!, { target: { value: '2024-01-02' } });
    fireEvent.change(document.querySelector('input[name="servicios_adicionales"]')!, { target: { value: 'servicio' } });
    fireEvent.change(document.querySelector('select[name="estrato"]')!, { target: { value: '1' } });
    fireEvent.change(document.querySelector('input[name="cuenta"]')!, { target: { value: '123' } });
    fireEvent.change(document.querySelector('input[name="OT"]')!, { target: { value: '456' } });
    fireEvent.change(document.querySelector('select[name="tipo_producto"]')!, { target: { value: 'residencial' } });
    fireEvent.change(document.querySelector('select[name="total_servicios"]')!, { target: { value: '2' } });
    fireEvent.change(document.querySelector('select[name="total_adicionales"]')!, { target: { value: '1' } });
    fireEvent.change(document.querySelector('input[name="cliente_cc"]')!, { target: { value: '123456789' } });
    fireEvent.change(document.querySelector('input[name="vendedor_id"]')!, { target: { value: '789' } });
    fireEvent.change(document.querySelector('select[name="estado"]')!, { target: { value: 'digitado' } });
    fireEvent.change(document.querySelector('input[name="convergente"]')!, { target: { value: 'no' } });
    fireEvent.change(document.querySelector('input[name="ciudad"]')!, { target: { value: 'Bogotá' } });
    fireEvent.submit(screen.getByRole('button'));
    await new Promise(r => setTimeout(r, 100));
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});