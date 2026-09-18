CREATE TABLE public.gift_pledges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL CHECK (char_length(trim(guest_name)) BETWEEN 1 AND 80),
  gift_type TEXT NOT NULL CHECK (gift_type IN ('cauvery', 'amazon')),
  tree_count INTEGER CHECK (tree_count BETWEEN 1 AND 10000),
  message TEXT CHECK (char_length(message) <= 500),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.gift_pledges TO anon, authenticated;
GRANT ALL ON public.gift_pledges TO service_role;

ALTER TABLE public.gift_pledges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gift pledges"
  ON public.gift_pledges FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add a gift pledge"
  ON public.gift_pledges FOR INSERT
  WITH CHECK (true);

CREATE INDEX gift_pledges_created_at_idx ON public.gift_pledges (created_at DESC);