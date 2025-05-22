const tokens = {
  // Layout Login (estructura)
  loginContainer: 'max-w-screen-sm mx-auto sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6',
  loginWrapper: 'container mx-auto flex justify-center items-center h-screen',
  loginBox: 'w-full max-w-[28rem]',
  loginCard: 'bg-boxdark shadow-lg rounded-lg px-8 py-10',
  loginLogoWrapper: 'flex justify-center items-center pb-5',

  // Formulario login
  formGroup: 'mb-4',
  formGroupPassword: 'mb-6',
  label: 'block text-white pb-5 text-center',
  input: 'w-full px-3 py-2 text-black border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white/50 active:ring-2 active:ring-white/50',

  // ⚠️ NUEVOS TOKENS para formularios generales
  inputDark: 'w-full px-5 py-3 text-white border border-white rounded-xl bg-transparent font-medium outline-none transition focus:border-primary active:border-primary dark:bg-darkbox',
  formCardWrapper: 'rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1',
  formScrollableBody: 'h-[60vh] overflow-y-auto justify-between',
  formLabel: 'block mb-3 text-black dark:text-white font-medium',
  formTitle: 'mb-6 text-xl font-semibold text-black dark:text-white',
  errorText: 'text-sm font-medium text-red-500',
  dangerButton: 'w-full bg-white text-red font-medium py-3 px-5 rounded-xl border border-transparent transition duration-300 hover:bg-red hover:text-white hover:border-white',

  // Otros botones y wrappers
  primaryButton: 'w-full bg-white text-boxdark font-bold py-2 px-4 rounded-md border border-transparent hover:bg-boxdark hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-red transition-all duration-300 ease-in-out',
  secondaryButton: 'group flex items-center gap-2 px-4 py-2 border border-transparent bg-white text-boxdark font-semibold rounded-md transition-colors duration-300 ease-in-out hover:bg-boxdark hover:text-white hover:border-white',

  // Home page
  container: 'relative w-full h-screen',
  backgroundImage: 'object-cover z-0',
  contentWrapper: 'absolute inset-0 z-10 flex flex-col justify-between',
  header: 'w-full p-4 flex justify-between items-center',
  bottomTextWrapper: 'p-8 text-white bg-black/50 w-full',
  bottomText: 'text-xl font-semibold',
};

export default tokens;
