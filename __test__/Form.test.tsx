import { render, screen, fireEvent } from '@testing-library/react';
import Form from '@/components/molecules/forms/FormLogin';
import '@testing-library/jest-dom';

describe('Validación de formulario de login', () => {
    const submitForm = async (username = '', password = '') => {
        render(<Form />);
        fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: username } });
        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: password } });
        fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }));
    };

    it('acepta un nombre de usuario válido', async () => {
        await submitForm('user1', 'Abcdef!1');
        expect(screen.queryByText(/solo se permiten letras y números/i)).not.toBeInTheDocument();
    });

    it('muestra error si username está vacío', async () => {
        await submitForm('', 'Abcdef!1');
        expect(await screen.findByText(/mínimo 4 caracteres/i)).toBeInTheDocument();
    });

    it('muestra error si username tiene menos de 4 caracteres', async () => {
        await submitForm('usr', 'Abcdef!1');
        expect(await screen.findByText(/mínimo 4 caracteres/i)).toBeInTheDocument();
    });

    it('muestra error si username contiene caracteres especiales', async () => {
        await submitForm('user!', 'Abcdef!1');
        expect(await screen.findByText(/solo se permiten letras y números/i)).toBeInTheDocument();
    });

    it('muestra error si username contiene espacios', async () => {
        await submitForm('user name', 'Abcdef!1');
        expect(await screen.findByText(/solo se permiten letras y números/i)).toBeInTheDocument();
    });

    it('muestra error si username contiene guiones', async () => {
        await submitForm('user-name', 'Abcdef!1');
        expect(await screen.findByText(/solo se permiten letras y números/i)).toBeInTheDocument();
    });

    it('acepta username con letras y números', async () => {
        await submitForm('user123', 'Abcdef!1');
        expect(screen.queryByText(/solo se permiten letras y números/i)).not.toBeInTheDocument();
    });

    it('muestra error si username contiene solo símbolos', async () => {
        await submitForm('$$##', 'Abcdef!1');
        expect(await screen.findByText(/solo se permiten letras y números/i)).toBeInTheDocument();
    });

    
    it('acepta una contraseña válida', async () => {
        await submitForm('usuario', 'Abcdef!1');
        expect(screen.queryByText(/caracter especial/i)).not.toBeInTheDocument();
    });

    it('muestra error si password está vacía', async () => {
        await submitForm('usuario', '');
        expect(await screen.findByText(/La contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });

    it('muestra error si password tiene menos de 8 caracteres', async () => {
        await submitForm('usuario', 'Ab!1');
        expect(await screen.findByText(/La contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });

    it('muestra error si password no tiene carácter especial', async () => {
        await submitForm('usuario', 'Abcdefgh');
        expect(await screen.findByText(/Debe contener al menos un carácter especial/i)).toBeInTheDocument();
    });

    it('muestra error si password no tiene mayúscula', async () => {
        await submitForm('usuario', 'abcdef!1');
        expect(await screen.findByText(/Debe contener al menos una mayúscula/i)).toBeInTheDocument();
    });

    it('muestra error si password tiene solo letras', async () => {
        await submitForm('usuario', 'Abcdefgh');
        expect(await screen.findByText(/Debe contener al menos un carácter especial/i)).toBeInTheDocument();
    });

    it('acepta password con múltiples caracteres especiales', async () => {
        await submitForm('usuario', 'Abc!@#12');
        expect(screen.queryByText(/Debe contener al menos un carácter especial/i)).not.toBeInTheDocument();
    });

    it('acepta una contraseña larga y compleja', async () => {
        await submitForm('usuario', 'A1b2C3d4!@#');
        expect(screen.queryByText(/Debe contener al menos un carácter especial/i)).not.toBeInTheDocument();
    });


    it('muestra errores si username y password están vacíos', async () => {
        await submitForm('', '');
        expect(await screen.findByText(/Se requiere mínimo 4 caracteres/i)).toBeInTheDocument();
        expect(await screen.findByText(/La contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });

    it('muestra errores si username es corto y password es inválida', async () => {
        await submitForm('usr', 'abc');
        expect(await screen.findByText(/mínimo 4 caracteres/i)).toBeInTheDocument();
        expect(await screen.findByText(/La contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });

    it('pasa si ambos campos son válidos', async () => {
        await submitForm('usuario123', 'Abcdef!1');
        expect(screen.queryByText(/error|obligatorio|caracter/i)).not.toBeInTheDocument();
    });
});