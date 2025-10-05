import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface GameState {
  balance: number;
  isPlaying: boolean;
  lastWin: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: 10000,
    isPlaying: false,
    lastWin: 0,
  });

  const [slotSymbols, setSlotSymbols] = useState(['🍒', '🍋', '🍊']);
  const [rouletteNumber, setRouletteNumber] = useState<number | null>(null);
  const [blackjackCards, setBlackjackCards] = useState<string[]>([]);

  const playSlots = () => {
    if (gameState.balance < 100) return;
    
    setGameState(prev => ({ ...prev, isPlaying: true, balance: prev.balance - 100 }));
    
    const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '⭐', '7️⃣'];
    let spins = 0;
    const interval = setInterval(() => {
      setSlotSymbols([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      spins++;
      if (spins > 20) {
        clearInterval(interval);
        const finalSymbols = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setSlotSymbols(finalSymbols);
        
        let win = 0;
        if (finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2]) {
          win = 1000;
        } else if (finalSymbols[0] === finalSymbols[1] || finalSymbols[1] === finalSymbols[2]) {
          win = 200;
        }
        
        setGameState(prev => ({
          ...prev,
          isPlaying: false,
          balance: prev.balance + win,
          lastWin: win,
        }));
      }
    }, 100);
  };

  const playRoulette = () => {
    if (gameState.balance < 100) return;
    
    setGameState(prev => ({ ...prev, isPlaying: true, balance: prev.balance - 100 }));
    setRouletteNumber(null);
    
    let spins = 0;
    const interval = setInterval(() => {
      setRouletteNumber(Math.floor(Math.random() * 37));
      spins++;
      if (spins > 30) {
        clearInterval(interval);
        const final = Math.floor(Math.random() * 37);
        setRouletteNumber(final);
        
        const win = final % 2 === 0 ? 200 : 0;
        
        setGameState(prev => ({
          ...prev,
          isPlaying: false,
          balance: prev.balance + win,
          lastWin: win,
        }));
      }
    }, 100);
  };

  const playBlackjack = () => {
    if (gameState.balance < 100) return;
    
    setGameState(prev => ({ ...prev, isPlaying: true, balance: prev.balance - 100 }));
    
    const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const hand = [
      cards[Math.floor(Math.random() * cards.length)],
      cards[Math.floor(Math.random() * cards.length)],
    ];
    setBlackjackCards(hand);
    
    setTimeout(() => {
      const win = Math.random() > 0.5 ? 250 : 0;
      
      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        balance: prev.balance + win,
        lastWin: win,
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27] text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDIxNywyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative z-10">
        <header className="border-b border-primary/20 backdrop-blur-sm bg-background/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary blur-xl opacity-50 animate-pulse-glow"></div>
                  <Icon name="Sparkles" className="relative w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  CASINO FUTURA
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/30 px-6 py-3">
                  <div className="flex items-center gap-2">
                    <Icon name="Coins" className="w-5 h-5 text-accent animate-glow" />
                    <div>
                      <p className="text-xs text-muted-foreground">Демо баланс</p>
                      <p className="text-2xl font-orbitron font-bold text-primary">
                        ${gameState.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Button 
                  variant="outline" 
                  className="border-primary/50 hover:bg-primary/20 hover:border-primary transition-all duration-300"
                >
                  <Icon name="User" className="w-5 h-5 mr-2" />
                  Профиль
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/50 px-4 py-2 text-sm font-orbitron animate-glow">
              ДЕМО РЕЖИМ
            </Badge>
            <h2 className="text-5xl font-orbitron font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Добро пожаловать в будущее игр
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Испытайте удачу в футуристичном казино с передовыми технологиями
            </p>
            
            {gameState.lastWin > 0 && (
              <div className="mt-6 animate-float">
                <Card className="inline-block bg-gradient-to-r from-accent to-secondary p-6 border-none shadow-2xl shadow-accent/50">
                  <p className="text-3xl font-orbitron font-bold">
                    🎉 ВЫИГРЫШ: ${gameState.lastWin}
                  </p>
                </Card>
              </div>
            )}
          </div>

          <Tabs defaultValue="slots" className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-3 bg-card/50 backdrop-blur-sm border border-primary/20 p-2 mb-8">
              <TabsTrigger 
                value="slots" 
                className="font-orbitron data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white transition-all duration-300"
              >
                <Icon name="Cherry" className="w-5 h-5 mr-2" />
                Слоты
              </TabsTrigger>
              <TabsTrigger 
                value="roulette"
                className="font-orbitron data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white transition-all duration-300"
              >
                <Icon name="Circle" className="w-5 h-5 mr-2" />
                Рулетка
              </TabsTrigger>
              <TabsTrigger 
                value="blackjack"
                className="font-orbitron data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white transition-all duration-300"
              >
                <Icon name="Spade" className="w-5 h-5 mr-2" />
                Блэкджек
              </TabsTrigger>
            </TabsList>

            <TabsContent value="slots" className="mt-8">
              <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-primary/30 p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-orbitron font-bold mb-2">Неоновые Слоты</h3>
                  <p className="text-muted-foreground">Ставка: $100</p>
                </div>
                
                <div className="bg-background/50 rounded-xl p-8 mb-8 border-2 border-primary/20">
                  <div className="flex justify-center gap-6">
                    {slotSymbols.map((symbol, idx) => (
                      <div
                        key={idx}
                        className="w-28 h-28 bg-gradient-to-br from-card to-muted rounded-2xl flex items-center justify-center text-6xl border-2 border-primary/50 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110"
                        style={{
                          animation: gameState.isPlaying ? 'spin-slow 0.5s linear infinite' : 'none'
                        }}
                      >
                        {symbol}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={playSlots}
                  disabled={gameState.isPlaying || gameState.balance < 100}
                  className="w-full h-16 text-xl font-orbitron font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transition-all duration-300 shadow-lg shadow-primary/50"
                >
                  {gameState.isPlaying ? (
                    <>
                      <Icon name="Loader" className="w-6 h-6 mr-2 animate-spin" />
                      Вращение...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" className="w-6 h-6 mr-2" />
                      ИГРАТЬ
                    </>
                  )}
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="roulette" className="mt-8">
              <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-primary/30 p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-orbitron font-bold mb-2">Квантовая Рулетка</h3>
                  <p className="text-muted-foreground">Ставка: $100 (Четное)</p>
                </div>
                
                <div className="bg-background/50 rounded-full w-80 h-80 mx-auto mb-8 flex items-center justify-center border-4 border-primary/30 shadow-2xl shadow-secondary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-spin-slow"></div>
                  <div className="relative text-8xl font-orbitron font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {rouletteNumber !== null ? rouletteNumber : '?'}
                  </div>
                </div>
                
                <Button
                  onClick={playRoulette}
                  disabled={gameState.isPlaying || gameState.balance < 100}
                  className="w-full h-16 text-xl font-orbitron font-bold bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80 transition-all duration-300 shadow-lg shadow-secondary/50"
                >
                  {gameState.isPlaying ? (
                    <>
                      <Icon name="Loader" className="w-6 h-6 mr-2 animate-spin" />
                      Вращение...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" className="w-6 h-6 mr-2" />
                      КРУТИТЬ
                    </>
                  )}
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="blackjack" className="mt-8">
              <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-primary/30 p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-orbitron font-bold mb-2">Цифровой Блэкджек</h3>
                  <p className="text-muted-foreground">Ставка: $100</p>
                </div>
                
                <div className="bg-background/50 rounded-xl p-8 mb-8 min-h-60 flex items-center justify-center border-2 border-accent/20">
                  {blackjackCards.length > 0 ? (
                    <div className="flex gap-4">
                      {blackjackCards.map((card, idx) => (
                        <div
                          key={idx}
                          className="w-32 h-48 bg-gradient-to-br from-card to-background rounded-xl flex items-center justify-center border-2 border-accent/50 shadow-xl shadow-accent/30 transform hover:scale-105 transition-transform"
                        >
                          <span className="text-6xl font-orbitron font-bold text-accent">
                            {card}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-2xl text-muted-foreground font-orbitron">
                      Нажмите ИГРАТЬ
                    </p>
                  )}
                </div>
                
                <Button
                  onClick={playBlackjack}
                  disabled={gameState.isPlaying || gameState.balance < 100}
                  className="w-full h-16 text-xl font-orbitron font-bold bg-gradient-to-r from-accent to-secondary hover:from-accent/80 hover:to-secondary/80 transition-all duration-300 shadow-lg shadow-accent/50"
                >
                  {gameState.isPlaying ? (
                    <>
                      <Icon name="Loader" className="w-6 h-6 mr-2 animate-spin" />
                      Раздача...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" className="w-6 h-6 mr-2" />
                      ИГРАТЬ
                    </>
                  )}
                </Button>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-card/30 backdrop-blur-sm border-primary/20 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
              <Icon name="Trophy" className="w-12 h-12 text-accent mb-4 animate-float" />
              <h3 className="text-xl font-orbitron font-bold mb-2">Турниры</h3>
              <p className="text-muted-foreground">
                Участвуйте в соревнованиях и выигрывайте призы
              </p>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-sm border-secondary/20 p-6 hover:border-secondary/50 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/20">
              <Icon name="Gift" className="w-12 h-12 text-secondary mb-4 animate-float" />
              <h3 className="text-xl font-orbitron font-bold mb-2">Бонусы</h3>
              <p className="text-muted-foreground">
                Получайте ежедневные награды и специальные предложения
              </p>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-sm border-accent/20 p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20">
              <Icon name="BarChart3" className="w-12 h-12 text-primary mb-4 animate-float" />
              <h3 className="text-xl font-orbitron font-bold mb-2">Статистика</h3>
              <p className="text-muted-foreground">
                Отслеживайте свой прогресс и достижения
              </p>
            </Card>
          </div>
        </main>

        <footer className="border-t border-primary/20 backdrop-blur-sm bg-background/10 mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
            <p className="font-orbitron">© 2025 Casino Futura. Демо режим — виртуальная валюта.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;