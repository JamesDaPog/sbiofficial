import { useLocation } from 'wouter'
import MultiStepForm from '../components/form/MultiStepForm'
import { BUSINESS_REQUEST } from '../data/forms'
import { useDocumentMeta } from '../lib/meta'

export default function Request() {
  useDocumentMeta('request')
  const [, navigate] = useLocation()

  return <MultiStepForm form={BUSINESS_REQUEST} onExit={() => navigate(BUSINESS_REQUEST.exitTo)} />
}
