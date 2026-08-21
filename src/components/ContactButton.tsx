'use client'

import { useState } from 'react'

const LINE_OPENCHAT_URL = 'https://line.me/ti/g2/E0FCGaQ7sQEvrWL4dVANeuzHaQTFgsYquTETpw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default'

export default function ContactButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-serif font-medium text-[#C9A45C] hover:text-[#789568] transition-colors"
      >
        ติดต่อ
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#3a4d2e]/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          ></div>

          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10">
            <div className="relative bg-gradient-to-r from-[#789568] to-[#536B3E] px-6 py-6 text-center text-white">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="ปิด"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <i className="ti ti-x"></i>
              </button>
              <h3 className="font-serif text-xl font-bold">ติดต่อเรา</h3>
              <p className="font-serif text-xs opacity-90 mt-1">สอบถามอะไรทักมาได้เลยนะคะ</p>
            </div>

            <div className="p-6 space-y-3">
              <a
                href="tel:0625563261"
                className="flex items-center gap-4 p-3 rounded-xl border border-[#789568]/20 bg-[#F5EBD2]/40 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-[#789568]/10 flex items-center justify-center flex-shrink-0">
                  <i className="ti ti-phone text-[#789568] text-lg"></i>
                </div>
                <div>
                  <p className="font-serif font-bold text-[#536B3E]">062-556-3261</p>
                  <p className="font-serif text-xs text-[#789568]">เจ้าสาว (ปาน)</p>
                </div>
              </a>

              <a
                href="tel:0895241646"
                className="flex items-center gap-4 p-3 rounded-xl border border-[#789568]/20 bg-[#F5EBD2]/40 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-[#789568]/10 flex items-center justify-center flex-shrink-0">
                  <i className="ti ti-phone text-[#789568] text-lg"></i>
                </div>
                <div>
                  <p className="font-serif font-bold text-[#536B3E]">089-524-1646</p>
                  <p className="font-serif text-xs text-[#789568]">เจ้าบ่าว (ไมค์)</p>
                </div>
              </a>

              <a
                href={LINE_OPENCHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#06C755] text-white font-serif font-bold rounded-xl hover:opacity-90 transition-all"
              >
                <i className="ti ti-brand-line text-xl"></i>
                เข้ากลุ่ม LINE OpenChat
              </a>
              <p className="font-serif text-xs text-[#789568] text-center leading-relaxed">
                THE WEDDING LOUNGE
                <br />
                พูดคุย ถามทาง และอัปเดตข่าวสารงานแต่ง
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
