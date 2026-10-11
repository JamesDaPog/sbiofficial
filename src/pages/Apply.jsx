import { useLocation } from 'wouter'
import MultiStepForm from '../components/form/MultiStepForm'
import { CHAPTER_APPLICATION } from '../data/forms'
import { useDocumentMeta } from '../lib/meta'

export default function Apply() {
  useDocumentMeta('apply')
  const [, navigate] = useLocation()

  return <MultiStepForm form={CHAPTER_APPLICATION} onExit={() => navigate(CHAPTER_APPLICATION.exitTo)} />
}
