import { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin, Clock, Users, Play, Pause, Volume2, Church, Gift, CreditCard, Copy, Check } from 'lucide-react';

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="relative bg-gradient-to-br from-white to-wedding-light/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-wedding-primary/30 border border-wedding-primary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-wedding-primary/5 to-transparent rounded-2xl"></div>
          <div className="relative">
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-wedding-primary to-wedding-secondary bg-clip-text text-transparent">{value}</div>
            <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider mt-3 font-medium">
              {unit === 'days' ? 'Días' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Minutos' : 'Segundos'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GiftSection() {
  const [copiedAccount, setCopiedAccount] = useState('');

  const bankAccounts = [
    {
      bank: 'Banco Nacional',
      accountNumber: '1234 5678 9012 3456',
      accountType: 'Cuenta de Ahorros',
      name: 'Vivian & Diter'
    },
    {
      bank: 'Banco Internacional',
      accountNumber: '9876 5432 1098 7654',
      accountType: 'Cuenta Corriente',
      name: 'Vivian & Diter'
    }
  ];

  const copyToClipboard = (text, accountId) => {
    navigator.clipboard.writeText(text.replace(/\s/g, '')).then(() => {
      setCopiedAccount(accountId);
      setTimeout(() => setCopiedAccount(''), 2000);
    });
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-wedding-light/30 to-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-wedding-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-wedding-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-wedding-primary/10 rounded-full p-4 mb-6">
            <Gift className="w-16 h-16 mx-auto text-wedding-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-wedding-dark mb-6 font-bold">
            Tu Presencia es el Mejor de los Regalos
          </h2>
          <div className="inline-block">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-wedding-primary to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-wedding-primary/20 text-center">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Sabemos que elegir el obsequio perfecto puede ser difícil,<br className="hidden md:block" />
              así que te traemos la solución
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {bankAccounts.map((account, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-wedding-light to-white p-8 rounded-2xl shadow-2xl border-2 border-wedding-primary/30 hover:border-wedding-primary/50 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-wedding-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-wedding-primary to-wedding-secondary rounded-full flex items-center justify-center shadow-lg">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-wedding-dark">
                    {account.bank}
                  </h3>
                  
                  <div className="bg-white/80 rounded-xl p-4 space-y-2">
                    <p className="text-sm text-gray-600 font-medium">{account.accountType}</p>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg md:text-xl font-mono font-bold text-wedding-secondary">
                        {account.accountNumber}
                      </p>
                      <button
                        onClick={() => copyToClipboard(account.accountNumber, `${index}-number`)}
                        className="flex-shrink-0 p-2 rounded-lg bg-wedding-primary/10 hover:bg-wedding-primary/20 transition-colors"
                        aria-label="Copiar número de cuenta"
                      >
                        {copiedAccount === `${index}-number` ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-wedding-primary" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 font-medium pt-2">{account.name}</p>
                  </div>

                  {copiedAccount === `${index}-number` && (
                    <p className="text-sm text-green-600 font-medium animate-fade-in">
                      ¡Copiado!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-wedding-primary/5 rounded-2xl px-8 py-4 border border-wedding-primary/20">
            <p className="text-gray-600 italic font-serif text-lg">
              💕 Con tu compañía es más que suficiente, pero si deseas hacernos un regalo, te agradecemos de corazón 💕
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RSVPForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    guests: '1',
    song: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      // Google Sheets Integration
      const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1ox9SsSaSsBvN2NEliMWR37YrJXv5UHCgkrj76fEUvlU/edit?usp=sharing'; // Reemplazar con la URL del Web App de Google Sheets
      
      // Si no asiste, no enviar el número de invitados
      const dataToSend = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        attending: formData.attending,
        ...(formData.attending === 'yes' && { guests: formData.guests }),
        song: formData.song,
        message: formData.message
      };

      // Enviar a Google Sheets
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      // Enviar notificación por email usando EmailJS
      const emailjs = await import('emailjs-com');
      
      await emailjs.send(
        'TU_SERVICE_ID', // Reemplazar con tu Service ID de EmailJS
        'TU_TEMPLATE_ID', // Reemplazar con tu Template ID de EmailJS
        {
          to_email: 'correo_del_novio@ejemplo.com', // Reemplazar con el correo del novio
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          attending: formData.attending === 'yes' ? 'Sí asistirá' : 'No asistirá',
          guests: formData.attending === 'yes' ? formData.guests : 'N/A',
          song: formData.song || 'No especificó canción',
          message: formData.message || 'Sin mensaje adicional'
        },
        'TU_PUBLIC_KEY' // Reemplazar con tu Public Key de EmailJS
      );

      setStatus('¡Gracias! Tu confirmación ha sido enviada correctamente.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        attending: 'yes',
        guests: '1',
        song: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setStatus('Hubo un error al enviar tu confirmación. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent transition"
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent transition"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent transition"
              placeholder="+52 123 456 7890"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="attending" className="block text-sm font-medium text-gray-700 mb-2">
              ¿Asistirás? *
            </label>
            <select
              id="attending"
              name="attending"
              required
              value={formData.attending}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent transition"
            >
              <option value="yes">Sí, asistiré</option>
              <option value="no">No podré asistir</option>
            </select>
          </div>

          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
              Número de Invitados {formData.attending === 'yes' ? '*' : '(No aplica)'}
            </label>
            <select
              id="guests"
              name="guests"
              required={formData.attending === 'yes'}
              disabled={formData.attending === 'no'}
              value={formData.guests}
              onChange={handleChange}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent transition ${
                formData.attending === 'no' ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
              }`}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="song" className="block text-sm font-medium text-gray-700 mb-2">
            🎵 ¿Qué canción no puede faltar? (Opcional)
          </label>
          <input
            type="text"
            id="song"
            name="song"
            value={formData.song}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent transition"
            placeholder="Ej: Perfect - Ed Sheeran"
          />
          <p className="text-sm text-gray-500 mt-1">¡Ayuda a crear la playlist perfecta para la fiesta!</p>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje (Opcional)
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-primary focus:border-transparent transition"
            placeholder="Déjanos un mensaje..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-wedding-primary hover:bg-wedding-secondary text-white font-semibold py-4 px-6 rounded-lg transition-colors transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? 'Enviando...' : 'Confirmar Asistencia'}
        </button>

        {status && (
          <div className={`p-4 rounded-lg ${status.includes('error') || status.includes('Hubo') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {status}
          </div>
        )}
      </div>
    </form>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-light via-white to-wedding-light overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-wedding-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-wedding-secondary rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-wedding-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Corazones flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-wedding-primary/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center px-4 py-20">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-wedding-primary/20 blur-2xl rounded-full animate-pulse"></div>
          <Heart className="relative w-20 h-20 mx-auto text-wedding-primary animate-bounce drop-shadow-2xl" />
        </div>
        
        <h1 className="font-script text-7xl md:text-9xl bg-gradient-to-r from-wedding-primary via-wedding-secondary to-wedding-primary bg-clip-text text-transparent mb-6 drop-shadow-lg animate-fade-in">
          Vivian & Diter
        </h1>
        
        <div className="inline-block bg-white/40 backdrop-blur-sm rounded-2xl px-8 py-4 mb-6 shadow-xl border border-wedding-primary/20">
          <p className="text-2xl md:text-3xl text-gray-700 font-serif">Nos casamos</p>
        </div>
        
        <div className="flex items-center justify-center gap-3 text-2xl md:text-4xl font-serif text-wedding-secondary mb-4">
          <Calendar className="w-10 h-10 animate-pulse" />
          <span className="font-bold">13 de Febrero, 2027</span>
        </div>
        
        {/* Music Player */}
        <MusicPlayer />
        
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-wedding-primary/20">
            <p className="text-lg md:text-2xl text-gray-600 italic leading-relaxed font-serif">
              "El amor no consiste en mirarse el uno al otro,<br />sino en mirar juntos en la misma dirección"
            </p>
            <p className="text-sm md:text-base text-wedding-secondary mt-3 font-medium">— Antoine de Saint-Exupéry</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-wedding-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-wedding-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <audio
        ref={audioRef}
        src="/wedding-song.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="bg-white/80 backdrop-blur-md rounded-full shadow-2xl p-2 border-2 border-wedding-primary/20">
        <button
          onClick={togglePlay}
          className="group relative bg-gradient-to-br from-wedding-primary to-wedding-secondary hover:from-wedding-secondary hover:to-wedding-primary text-white rounded-full p-6 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 animate-pulse" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
      
      <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
        <Volume2 className="w-5 h-5 text-wedding-primary" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-wedding-primary"
          aria-label="Control de volumen"
        />
      </div>
      
      <p className="text-sm text-gray-600 italic font-serif">
        {isPlaying ? '♪ Nuestra canción especial ♪' : 'Haz clic para escuchar nuestra canción'}
      </p>
    </div>
  );
}

function CountdownSection({ weddingDate }) {
  return (
    <section className="relative py-24 bg-gradient-to-br from-wedding-primary/10 via-white to-wedding-secondary/10 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-72 h-72 bg-wedding-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-wedding-secondary rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-wedding-primary/10 rounded-full p-4 mb-6">
            <Clock className="w-16 h-16 mx-auto text-wedding-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-wedding-dark mb-4 font-bold">Cuenta Regresiva</h2>
          <p className="text-xl text-gray-600 font-medium">Faltan muy pocos días para nuestro gran día</p>
          <div className="mt-4 inline-block">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-wedding-primary to-transparent rounded-full"></div>
          </div>
        </div>
        <Countdown targetDate={weddingDate} />
      </div>
    </section>
  );
}

function EventDetailsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-wedding-dark mb-16">Detalles del Evento</h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Ceremonia */}
          <div className="group relative bg-gradient-to-br from-wedding-light to-white p-10 rounded-2xl shadow-2xl border-2 border-wedding-primary/30 hover:border-wedding-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-wedding-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-wedding-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-wedding-primary to-wedding-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Church className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-serif text-wedding-dark mb-6 font-bold">Ceremonia</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-wedding-primary" />
                  <span>16:00 hrs</span>
                </p>
                <p className="flex items-start justify-center gap-2">
                  <MapPin className="w-5 h-5 text-wedding-primary mt-1 flex-shrink-0" />
                  <span className="text-left">
                    Parroquia San Pedro<br />
                    C. Pl. de Armas 101, 11703<br />
                    Grocio Prado
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Recepción */}
          <div className="group relative bg-gradient-to-br from-wedding-light to-white p-10 rounded-2xl shadow-2xl border-2 border-wedding-primary/30 hover:border-wedding-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-wedding-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-wedding-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-wedding-primary to-wedding-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-serif text-wedding-dark mb-6 font-bold">Recepción</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-wedding-primary" />
                  <span>18:00 hrs</span>
                </p>
                <p className="flex items-start justify-center gap-2">
                  <MapPin className="w-5 h-5 text-wedding-primary mt-1 flex-shrink-0" />
                  <span className="text-left">
                    El rinconcito escondido<br />
                    C. La Unión Nº 100, 11703<br />
                    Grocio Prado
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dress Code */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-wedding-light via-white to-wedding-light/50 p-10 rounded-2xl border-2 border-wedding-primary/40 shadow-2xl">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-wedding-primary text-white px-6 py-2 rounded-full font-serif text-lg shadow-lg">
              ✨ Dress Code ✨
            </div>
            <h3 className="text-3xl font-serif text-wedding-dark mb-4 mt-4 font-bold">Código de Vestimenta</h3>
            <p className="text-2xl text-wedding-primary font-semibold mb-3">Formal / Etiqueta</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RSVPSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-wedding-primary/5 via-wedding-secondary/5 to-wedding-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Heart className="w-12 h-12 mx-auto text-wedding-primary mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif text-wedding-dark mb-4">Confirma tu Asistencia</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tu presencia es muy importante para nosotros. Por favor, confirma tu asistencia antes del 15 de enero de 2027.
          </p>
        </div>
        <RSVPForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-wedding-dark text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <Heart className="w-10 h-10 mx-auto mb-4 text-wedding-primary" />
        <p className="text-2xl font-script mb-2">Vivian & Diter</p>
        <p className="text-wedding-light/80">13 de Febrero, 2027</p>
        <p className="text-wedding-light/60 mt-4 text-sm">
          ¡Esperamos celebrar este día tan especial contigo!
        </p>
      </div>
    </footer>
  );
}

function App() {
  const weddingDate = '2027-02-13T16:00:00';

  // 🎯 ORDEN DE LAS SECCIONES - Puedes reorganizar estos componentes fácilmente
  // Solo cambia el orden de los componentes en el array para modificar la estructura de la página
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CountdownSection weddingDate={weddingDate} />
      <EventDetailsSection />
    <GiftSection />
      <RSVPSection />
      <Footer />
    </div>
  );
}

export default App;
