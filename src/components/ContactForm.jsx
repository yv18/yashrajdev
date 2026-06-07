import React, { useState, useRef } from "react";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const EMAILJS_SERVICE_ID  = "service_bqaw8mi";
const EMAILJS_TEMPLATE_ID = "template_w31uzzv";
const EMAILJS_PUBLIC_KEY  = "PwVMQnY73wqNlen5C";

const FIELDS = [
  { id: "from_name",  label: "Your Name",  type: "text",  placeholder: "Yashraj Raj",             Icon: PersonOutlineRoundedIcon },
  { id: "from_email", label: "Your Email", type: "email", placeholder: "abc@example.com",     Icon: EmailOutlinedIcon },
  { id: "subject",    label: "Subject",    type: "text",  placeholder: "Let's work together!", Icon: LightbulbOutlinedIcon },
];

export default function ContactForm() {
  const [values,  setValues]  = useState({ from_name: "", from_email: "", subject: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [status,  setStatus]  = useState("idle"); // idle | sending | success | error
  const [touched, setTouched] = useState({});

  const handleChange = (e) => setValues(v => ({ ...v, [e.target.id]: e.target.value }));
  const handleBlur   = (e) => setTouched(t => ({ ...t, [e.target.id]: true }));

  const validate = () => {
    const errs = {};
    if (!values.from_name.trim())                               errs.from_name  = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.from_email)) errs.from_email = "Valid email required";
    if (!values.subject.trim())                                 errs.subject    = "Subject is required";
    if (values.message.trim().length < 10)                      errs.message    = "Message is too short";
    return errs;
  };

  const errors  = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async () => {
    setTouched({ from_name: true, from_email: true, subject: true, message: true });
    if (!isValid) return;

    setStatus("sending");
    try {
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      }
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, values);
      setStatus("success");
      setValues({ from_name: "", from_email: "", subject: "", message: "" });
      setTouched({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  /* ── button state config ── */
  const btnStates = {
    idle:    { Icon: SendRoundedIcon,                label: "Send Message",   cls: "" },
    sending: { Icon: null,                           label: "Sending...",     cls: "cf-submit--sending" },
    success: { Icon: CheckCircleOutlineRoundedIcon,  label: "Message Sent!",  cls: "cf-submit--success" },
    error:   { Icon: ErrorOutlineRoundedIcon,        label: "Failed — Retry", cls: "cf-submit--error" },
  };
  const btn = btnStates[status];

  return (
    <div className="cf-shell">
      <div className="cf-glow-tl" />
      <div className="cf-glow-br" />

      <h3 className="cf-heading">Send a Message</h3>
      <p className="cf-subheading">I'll reply within 48 hours ⚡</p>

      <div className="cf-fields">
        {FIELDS.map(({ id, label, type, placeholder, Icon }) => {
          const hasErr = touched[id] && errors[id];
          const isFoc  = focused === id;
          return (
            <div key={id} className={`cf-field ${isFoc ? "cf-field--focused" : ""} ${hasErr ? "cf-field--error" : ""}`}>
              <label className="cf-label" htmlFor={id}>
                <Icon className="cf-label-icon" sx={{ fontSize: 15 }} />
                {label}
              </label>
              <div className="cf-input-wrap">
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  value={values[id]}
                  onChange={handleChange}
                  onFocus={() => setFocused(id)}
                  onBlur={(e) => { setFocused(null); handleBlur(e); }}
                  className="cf-input"
                  autoComplete="off"
                />
                {values[id] && !hasErr && (
                  <CheckRoundedIcon className="cf-check" sx={{ fontSize: 16 }} />
                )}
              </div>
              {hasErr && <p className="cf-error">{errors[id]}</p>}
            </div>
          );
        })}

        {/* Message textarea */}
        <div className={`cf-field cf-field--full ${focused === "message" ? "cf-field--focused" : ""} ${touched.message && errors.message ? "cf-field--error" : ""}`}>
          <label className="cf-label" htmlFor="message">
            <EditNoteRoundedIcon className="cf-label-icon" sx={{ fontSize: 15 }} />
            Message
          </label>
          <div className="cf-input-wrap">
            <textarea
              id="message"
              placeholder="Tell me about your project, opportunity, or just say hi..."
              value={values.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={(e) => { setFocused(null); handleBlur(e); }}
              className="cf-input cf-textarea"
              rows={5}
            />
            {values.message.length > 0 && (
              <span className="cf-char-count">{values.message.length} chars</span>
            )}
          </div>
          {touched.message && errors.message && <p className="cf-error">{errors.message}</p>}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        className={`cf-submit ${btn.cls}`}
      >
        {status === "sending" ? (
          <span className="cf-spinner" />
        ) : (
          <btn.Icon sx={{ fontSize: 18 }} />
        )}
        {btn.label}
      </button>

      {status === "success" && (
        <div className="cf-success-banner">
          <CelebrationOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Thanks! I'll get back to you soon.</span>
        </div>
      )}
    </div>
  );
}