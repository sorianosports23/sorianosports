import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs"

import styles from "../../css/aside/SocialAside.module.css"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { FaXTwitter } from "react-icons/fa6"

const SocialAside = () => {

  const [mediaOpen, setMediaOpen] = useState(false)
  const [pos, setPos] = useState(0)
  const [onTransition, setOnTransition] = useState(false)
  const buttonmedia = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const interval = setInterval(() => {
      setOnTransition(true)
      setPos(oldPos => {
        // if (oldPos === 3) return 0
        return oldPos+1
      })
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (pos === 4 && !onTransition) {
      setPos(0)
    }
    if (pos >= 5) {
      setPos(0)
    }
  }, [pos, onTransition])

  // useEffect(() => {
  //   if (pos === 0 && !ontr)
  // }, [pos, onTransition])

  useEffect(() => {
    const colors = [
      "#00a", 
      "linear-gradient(180deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)", 
      "#222", 
      "#a00", 
      "#00a"]
    buttonmedia.current.style.background = colors[pos]
  }, [pos, buttonmedia])

  return (
    <>
    {/* <aside className={styles.aside}>
      <ul className={styles.ul}>
        <li><a href="##" className={styles.facebook}><BsFacebook/></a></li>
        <li><a href="##" className={styles.instagram}><BsInstagram/></a></li>
        <li><a href="##" className={styles.twitter}><BsTwitter/></a></li>
        <li><a href="##" className={styles.youtube}><BsYoutube/></a></li>
      </ul>
    </aside> */}
    
    <div className={styles.social}>
      <button className={styles.social_icons} onClick={() => setMediaOpen(prev => !prev)}>
        <div ref={buttonmedia}
          style={{
            transform: `translateY(-${3.5 * pos}rem)`,
            transition: !onTransition ? "none" : "transform .3s, background .3s"
          }}
          onTransitionEnd={() => setOnTransition(false)}
        >
          <div>
            <BsFacebook/>
          </div>
          <div>
            <BsInstagram/>
          </div>
          <div>
            <FaXTwitter/>
          </div>
          <div>
            <BsYoutube/>
          </div>
          <div>
            <BsFacebook/>
          </div>
        </div>
      </button>

      <div className={styles.social_media}
        style={{
          transform: `translate(-4rem, -4rem) scale(${mediaOpen ? 1 : 0})`
        }}
      >
        <a href="##" className={styles.fb_btn} title="Facebook"><BsFacebook/></a>
        <a href="##" className={styles.ig_btn} title="Instagram"><BsInstagram/></a>
        <a href="##" className={styles.tw_btn} title="X (Twitter)"><FaXTwitter/></a>
        <a href="##" className={styles.yt_btn} title="Youtube"><BsYoutube/></a>
      </div>
    </div>
    </>
  )
}

export default SocialAside