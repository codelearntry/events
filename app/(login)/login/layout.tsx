export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='w-full h-full bg-gray-300 '>
      <head />
      <body className='flex flex-col justify-between w-full h-full'>
        {children}
      </body>
    </html>
  )
}
