import { delay } from "motion/react";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function TerminalComponent() {
  const containerRef = useRef(null);
  const termRef = useRef(null);
  const fitAddonRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "JetBrains Mono, monospace",
      theme: {
        background: "#16161a", 
        cursor: "#38bdf8",
        foreground: "#fffffe"
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(containerRef.current);
    fitAddon.fit();
    term.writeln("\x1b[36m");
    term.writeln("  ___     _      ___         _    _    _  ")
    term.writeln(" | __|_ _(_)___ | _ \\__ _ __| |_ (_)__| |")
    term.writeln(" | _/ _` | |_ / |   / _` (_-< ' \\| / _` |")
    term.writeln(" |_|\\__,_|_/__| |_|_\\__,_/__/_||_|_\\__,_|")
    term.writeln("\x1b[0m");

    // term.writeln("\x1b[1;36mWelcome to Faiz Terminal\x1b[0m");
    term.writeln("\x1b[90mType \x1b[96mhelp\x1b[90m to get started\x1b[0m");
    term.prompt = () => {
      term.write("\r\n\x1b[1;32mfaiz\x1b[0m@\x1b[1;34mportfolio\x1b[0m $ ");
    };

    term.prompt();

    let command = "";
    term.onKey(({ key, domEvent }) => {
      const printable =
        !domEvent.altKey &&
        !domEvent.ctrlKey &&
        !domEvent.metaKey;

       if (domEvent.keyCode === 13) {
            term.write("\r\n");

            if (command === "help") {
            term.writeln("\x1b[1;36mCommands:\x1b[0m");
            term.writeln("\x1b[90m  about  - About me\x1b[0m");
            term.writeln("\x1b[90m  skills - My skills\x1b[0m");
            } else if (command === "about") {
            term.writeln("Muhammad Faiz Rashid — Software Engineer");
            } else {
            term.writeln(`Command not found: ${command}`);
            }

            command = "";
            term.prompt();
        } else if (domEvent.keyCode === 8) {
            if (command.length > 0) {
            command = command.slice(0, -1);
            term.write("\b \b");
            }
        } else if (printable) {
            command += key;
            term.write(key);
        }
    });

    termRef.current = term;
    fitAddonRef.current = fitAddon;

    const onResize = () => fitAddon.fit();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      term.dispose();
    };
  }, []);

  return (
    <div className="bg-bg border border-border rounded-xl p-3">
      <div ref={containerRef} className="h-64 w-full" />
    </div>
  );

}