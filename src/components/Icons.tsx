import { LucideProps, MessageSquare, User } from 'lucide-react'

export const Icons = {
  user: User,
  logo: (props: LucideProps) => (
    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
   
  ),
  google: (props: LucideProps) => (
    <svg {...props} viewBox='0 0 24 24'>
      <path
        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
        fill='#4285F4'
      />
      <path
        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
        fill='#34A853'
      />
      <path
        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
        fill='#FBBC05'
      />
      <path
        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
        fill='#EA4335'
      />
      <path d='M1 1h22v22H1z' fill='none' />
    </svg>
  ),
  twitter: (props: LucideProps) => (
    <svg viewBox="0 0 1024 1024" {...props}  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M362.41 879.648c-95.417 0-192.465-27.316-288.485-81.263-8.064-4.527-11.83-14.15-8.98-22.977 2.855-8.788 11.185-14.191 20.773-13.355 72.17 8.408 148.407-8.75 205.511-42.302-66.043-15.525-119.417-58.397-147.571-120.676a19.454 19.454 0 0 1 3.119-20.884c4.983-5.746 13.011-8.03 20.317-5.781a142.417 142.417 0 0 0 25.033 5.364c-50.106-29.903-103.784-87.197-103.784-172.987 0-7.531 4.335-14.379 11.11-17.573a19.353 19.353 0 0 1 20.654 2.47c6.241 5.099 12.938 9.362 19.821 12.708-14.339-19.44-26.781-43.562-33.857-70.8-12.972-49.989-5.478-100.585 21.683-146.351 3.233-5.516 9.018-9.054 15.372-9.514 6.238-0.681 12.552 2.249 16.584 7.27 57.332 71.633 159.212 158.183 323.066 174.01-3.003-51.854 12.556-136.841 84.154-178.653 87.462-51.13 173.248-44.434 245.606 18.983 32.263-7.187 83.202-29.291 93.741-36.673a19.516 19.516 0 0 1 22.33-0.04c6.696 4.683 9.779 13.052 7.686 20.963-4.87 18.375-15.864 38.765-29.6 57.027 10.881-3.233 20.012-6.505 24.882-9.014 7.837-3.997 17.308-2.322 23.318 4.146 5.937 6.505 6.775 16.131 2.097 23.587-22.942 36.218-59.959 69.963-84.727 88.222 9.931 121.587-39.26 255.425-132.998 360.459-99.976 111.966-233.776 173.634-376.781 173.634h-0.074z" fill="#2577FF" /><path d="M773.705 209.378c11.484-2.559 25.333-7.039 38.885-12.041-50.557-43.083-107.542-58.134-158.074-50.884 36.738 5.548 86.781 34.522 119.189 62.925zM484.047 365.248c-0.152-2.646-0.222-5.432-0.275-8.24-133.027-2.397-266.805-97.597-324.061-174.009-3.863-5.155-10.347-7.952-16.584-7.271-6.354 0.46-12.138 3.998-15.371 9.514-2.83 4.767-5.318 9.616-7.72 14.483 86.352 148.04 212.727 150.909 364.011 165.523zM954.896 233.745c-6.012-6.466-15.483-8.141-23.32-4.144-4.87 2.509-14.002 5.781-24.882 9.014 13.736-18.262 24.73-38.652 29.6-57.027a19.502 19.502 0 0 0-7.686-20.963 19.52 19.52 0 0 0-22.33 0.039c-3.711 2.6-12.577 7.061-23.723 12.014 0.607 2.903 0.772 5.914-0.021 8.911-4.87 18.375-15.864 38.765-29.599 57.027 10.881-3.233 20.012-6.505 24.882-9.014 7.837-3.997 17.308-2.322 23.32 4.144 5.936 6.507 6.774 16.133 2.095 23.59-22.942 36.216-59.959 69.961-84.726 88.22 9.929 121.587-39.261 255.425-132.997 360.461C592.268 810.433 469.603 871.055 337.5 878.76c8.309 0.411 16.624 0.888 24.91 0.888h0.073c143.006 0 276.806-61.669 376.784-173.633 93.736-105.035 142.927-238.874 132.997-360.461 24.767-18.259 61.784-52.004 84.726-88.22 4.68-7.457 3.842-17.083-2.094-23.589z" fill="" /></svg>
  ),
  github: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"  fill='white' viewBox="0 0 30 30" width="30px" {...props} >    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"/></svg>
  ),
  commentReply: MessageSquare,
}