import { render, screen, fireEvent } from '@testing-library/react';
import FormUsers from '@/components/molecules/forms/FormUsers';

describe('FormUsers', () => {
  it('renderiza todos los campos', () => {
    render(<FormUsers />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(2);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
  });

  it('muestra error si usuario está vacío', async () => {
    render(<FormUsers />);
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/mínimo 4 caracteres/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('muestra error si contraseña es débil', async () => {
    render(<FormUsers />);
    const passwordInput = document.querySelector('input[type="password"]');
    fireEvent.change(passwordInput!, { target: { value: 'abc' } });
    fireEvent.submit(screen.getByRole('button'));
    expect(await screen.findByText(/al menos 8 caracteres/i)).toBeInTheDocument();
  });

  it('muestra error si nombre es muy corto', async () => {
    render(<FormUsers />);
    const nameInput = screen.getAllByRole('textbox')[1];
    fireEvent.change(nameInput, { target: { value: 'ab' } });
    fireEvent.submit(screen.getByRole('button'));
    const errors = await screen.findAllByText(/mínimo 4 caracteres/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('permite crear usuario con datos válidos', async () => {
    render(<FormUsers />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'usuario1' } });
    const passwordInput = document.querySelector('input[type="password"]');
    fireEvent.change(passwordInput!, { target: { value: 'Abcdef!1' } });
    fireEvent.change(inputs[1], { target: { value: 'Nombre Prueba' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'admin' } });
    fireEvent.submit(screen.getByRole('button'));
  });

  it('renderiza todas las opciones de rol', () => {
    render(<FormUsers />);
    const options = screen.getAllByRole('option');
    const values = options.map(opt => opt.textContent?.toLowerCase());
    expect(values).toEqual(
      expect.arrayContaining([
        'super',
        'admin',
        'pyme',
        'coordinador',
        'vendedor',
        'rol',
        'activador'
      ])
    );
  });
});