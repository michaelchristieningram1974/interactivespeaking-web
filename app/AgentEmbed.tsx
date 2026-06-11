'use client'

import { useEffect, useRef, useState } from 'react'

export default function AgentEmbed({ type, agentId }: { type: string, agentId: string }) {
  if (!agentId) return null

  if (type === 'elevenlabs_widget') {
    return (
      <div dangerouslySetInnerHTML={{ __html: `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>` }} />
    )
  }

  if (type === 'vapi_widget' || type === 'vapi_api') {
    return <VapiWidget assistantId={agentId} />
  }

  return (
    <p style={{ color: '#888', fontSize: '0.9rem' }}>
      API integration coming soon for agent: {agentId}
    </p>
  )
}

function VapiWidget({ assistantId }: { assistantId: string }) {
  const vapiRef = useRef<any>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)
  const [ready, setReady] = useState(false)
  const [calling, setCalling] = useState(false)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const { default: Vapi } = await import('@vapi-ai/web')
        if (!mounted) return
        const vapi = new Vapi('d8fe9d66-bb98-4ca3-ad19-8f94db8e639b')
        vapiRef.current = vapi

        vapi.on('call-start', () => {
          if (!mounted) return
          setCalling(true)
          if (statusRef.current) statusRef.current.textContent = 'Call started — speak now'
        })

        vapi.on('call-end', () => {
          if (!mounted) return
          setCalling(false)
          if (statusRef.current) statusRef.current.textContent = 'Call ended'
        })

        vapi.on('error', (error: any) => {
          console.error('Vapi error:', error)
          if (!mounted) return
          setCalling(false)
          if (statusRef.current) statusRef.current.textContent = 'Error — please try again'
        })

        setReady(true)
      } catch (err) {
        console.error('Failed to load Vapi:', err)
      }
    }

    init()

    return () => {
      mounted = false
      if (vapiRef.current) vapiRef.current.stop()
    }
  }, [])

  const handleClick = async () => {
    if (!vapiRef.current) return
    if (calling) {
      vapiRef.current.stop()
    } else {
      await vapiRef.current.start(assistantId)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <button
        onClick={handleClick}
        disabled={!ready}
        style={{
          background: !ready ? '#aaa' : calling ? '#c0392b' : '#0066CC',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '16px 40px',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: ready ? 'pointer' : 'not-allowed',
          letterSpacing: '0.05em',
          transition: 'background 0.3s',
        }}
      >
        {!ready ? 'Loading...' : calling ? 'End Call' : 'Start Conversation'}
      </button>
      <p ref={statusRef} style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>
        {ready ? 'Click to start speaking with the AI' : 'Initialising voice agent...'}
      </p>
    </div>
  )
}