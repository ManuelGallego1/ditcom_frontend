const tokens = {

  // Tokens para layout login (estructura)
  loginContainer: 'max-w-screen-sm mx-auto w-1/2',
  loginWrapper: 'container mx-auto flex justify-center items-center h-screen',
  loginBox: 'w-full max-w-[28rem]',
  loginCard: 'bg-boxdark shadow-lg rounded-lg px-8 py-10',
  loginLogoWrapper: 'flex justify-center items-center pb-5',

  // Tokens específicos para el formulario de login
  formGroup: 'mb-4',
  formGroupPassword: 'mb-6',
  label: 'block text-white pb-5 text-center',
  input:
    'w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-indigo-300',
  errorText: 'font-bold',
  formButton:
    'w-full bg-white text-boxdark font-bold py-2 px-4 rounded-md border border-transparent hover:bg-boxdark hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-red',

  // Tokens extraídos de tu código Home.jsx
  container: 'relative w-full h-screen',
  backgroundImage: 'object-cover z-0',
  contentWrapper: 'absolute inset-0 z-10 flex flex-col justify-between',
  header: 'w-full p-4 flex justify-between items-center',
  loginButton:
  'group flex items-center gap-2 px-4 py-2 border border-transparent bg-white text-boxdark text-xl font-semibold rounded-md transition duration-300 hover:bg-boxdark hover:text-white hover:border-white',

  bottomTextWrapper: 'p-8 text-white bg-black/50 w-full',
  bottomText: 'text-xl font-semibold',
};

export default tokens;
