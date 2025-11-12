import Image from "next/image";

const About: React.FC = () => {
  return (
 
    <div className="bg-[#80cff9] text-[#0a2e47] border border-[#1ca7ec] flex flex-col items-center py-16 px-6 sm:px-10 md:px-16 lg:px-24" id="About">
      
      {/* Judul Utama */}
      <h1 className="text-3xl sm:text-4xl font-semibold text-center py-12">#Tentang Kita</h1>

      {/* === Visi & Misi === */}
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full justify-center">
        {/* Visi */}
        <div className="flex-1 bg-[#bce5fb] rounded-2xl p-6 shadow-md backdrop-blur-sm">
          <h2 className="text-2xl font-medium pb-3">Visi</h2>
          <ul className="list-disc list-inside space-y-2 text-base sm:text-lg leading-relaxed">
            <li>Mengadakan kegiatan penanaman dan pelestarian mangrove.</li>
            <li>Menjadi lembaga aktif dalam pelestarian mangrove & lingkungan pesisir.</li>
            <li>Meningkatkan kesadaran masyarakat terhadap keberlanjutan ekosistem.</li>
          </ul>
        </div>

        {/* Misi */}
        <div className="flex-1 bg-[#bce5fb] rounded-2xl p-6 shadow-md backdrop-blur-sm">
          <h2 className="text-2xl font-medium pb-3">Misi</h2>
          <ul className="list-decimal list-inside space-y-2 text-base sm:text-lg leading-relaxed">
            <li>Mengadakan kegiatan penanaman dan pelestarian mangrove.</li>
            <li>Mengedukasi masyarakat dan generasi muda tentang pentingnya mangrove.</li>
            <li>Mendorong penelitian dan inovasi terkait ekosistem pesisir.</li>
            <li>Bekerjasama dengan komunitas dan pemerintah untuk keberlanjutan lingkungan.</li>
          </ul>
        </div>
      </div>

      {/* === Pendirian Yayasan === */}
      <div className="max-w-4xl w-full text-center mt-20 flex justify-center flex-col">
        <h2 className="text-2xl font-medium mb-6">Pendirian Yayasan</h2>
        <div className="flex flex-col items-center">
          <Image src="/images/slice_4.png" alt="yayasan" width={200} height={0} className="w-[900px] h-[400px] object-cover rounded-lg shadow-lg" />
          <p className="mt-6 sm:text-sm leading-relaxed text-justify px-2 sm:px-6 text-sm">
            Ilustrasi kegiatan penanaman bakau dan pelestarian mangrove 2027.
          </p>
        </div>

        {/* Paragraf deskripsi panjang */}
        <p className="max-w-4xl text-center mt-12 text-xl sm:text-lg leading-relaxed">
          Melalui konsep penataan dan perencanaan bakau yang tepat, kita dapat menjaga
          keberlanjutan ekosistem pesisir Indonesia serta meningkatkan kesejahteraan masyarakat
          lokal yang bergantung pada alam. Konsep ini menekankan pentingnya kolaborasi antara 
          pemerintah, masyarakat, dan lembaga lingkungan demi keberlanjutan pesisir.
        </p>
      </div>

      {/* === Konsep Penataan Bakau === */}
      <section className="mt-24 w-full flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center pb-10">
          #Konsep Penataan & Perencanaan Bakau
        </h2>

        {/* Prinsip Utama */}
        <div className="max-w-5xl w-full bg-white/40 rounded-3xl shadow-md backdrop-blur-sm p-8">
          <h3 className="text-2xl sm:text-3xl font-semibold text-center pb-4">
            Prinsip Utama Penataan Bakau
          </h3>
          <ul className="list-disc list-inside space-y-3 text-base sm:text-lg leading-relaxed">
            <li>
              <span className="font-medium">Keberlanjutan:</span> Menjaga keseimbangan antara
              manfaat ekonomi dan fungsi ekologis.
            </li>
            <li>
              <span className="font-medium">Partisipatif:</span> Melibatkan masyarakat lokal dalam
              setiap tahap perencanaan.
            </li>
            <li>
              <span className="font-medium">Adaptif:</span> Menyesuaikan desain dan tata ruang
              dengan kondisi lingkungan pesisir.
            </li>
            <li>
              <span className="font-medium">Restoratif:</span> Mengembalikan area rusak menjadi
              produktif dan hijau kembali.
            </li>
          </ul>
        </div>
      </section>

      {/* === Distribusi & Pembinaan === */}
      <section className="max-w-6xl w-full mt-20 flex flex-col lg:flex-row items-center gap-10">
        {/* Gambar */}
        <div className="flex-1 flex justify-center">
       <Image src="/images/slice_4.png" alt="yayasan" width={200} height={0} className="w-[900px] h-[400px] object-cover rounded-lg shadow-lg"/>
        </div>

        {/* Teks */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <h3 className="text-2xl font-semibold pb-4">Distribusi Tata Budidaya</h3>
          <p className="text-base sm:text-lg leading-relaxed">
            Yayasan aktif melakukan pembinaan masyarakat pesisir untuk pengelolaan budidaya
            berkelanjutan, menjaga keseimbangan ekosistem dan sosial ekonomi warga sekitar.
          </p>
          <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed space-y-2">
            <li>Pembinaan masyarakat lokal.</li>
            <li>Pelatihan pengelolaan mangrove berkelanjutan.</li>
            <li>Kerjasama antar komunitas lingkungan.</li>
          </ul>
        </div>
      </section>
    </div> 
  );
};

export default About;
