const tokens = {
  // Tokens para tabla y elementos generales
  table: 'min-w-[1200px] w-full text-left table-auto text-sm sm:text-base',
  tableHeader: 'bg-gray-200 dark:bg-darkbox text-center font-bold uppercase',
  tableBorder: 'p-2 border',
  button:
    'group flex items-center gap-2 px-4 py-2 border border-transparent bg-white text-red text-xl font-semibold rounded-md transition duration-300 hover:bg-red hover:text-white hover:border-white',
  stats:
    'w-full rounded-lg border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark',
  statsTitle: 'text-lg font-semibold text-black dark:text-white',
  statsDescription: 'flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-boxdark',

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
};

export default tokens;
